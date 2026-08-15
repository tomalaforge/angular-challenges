import { Router } from 'express';
import { readAuthCookie } from './auth';

const REPO = 'tomalaforge/angular-challenges';
const REPO_FIRST_YEAR = 2022;
const EXCLUDED_USERS = new Set(['allcontributors[bot]', 'tomalaforge']);
const GITHUB_API = 'https://api.github.com';

interface CacheEntry {
  expires: number;
  status: number;
  data: unknown;
}

/** Tiny in-memory TTL cache — enough to stay far below GitHub rate limits. */
const cache = new Map<string, CacheEntry>();
/** Per-PR paths would otherwise make the cache grow without bound on a warm instance. */
const CACHE_MAX_ENTRIES = 500;
const REQUEST_TIMEOUT_MS = 10_000;
const RATE_LIMIT_RETRIES = 2;

/** Writes an entry, evicting the least recently written ones once the cap is reached. */
function setCache(key: string, entry: CacheEntry): void {
  cache.delete(key);
  cache.set(key, entry);
  while (cache.size > CACHE_MAX_ENTRIES) {
    const oldest = cache.keys().next();
    if (oldest.done) {
      break;
    }
    cache.delete(oldest.value);
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Retry-After / X-RateLimit-Reset aware backoff, capped so a request never hangs a page. */
function retryDelayMs(response: Response, attempt: number): number {
  const retryAfter = Number(response.headers.get('retry-after'));
  if (Number.isFinite(retryAfter) && retryAfter > 0) {
    return Math.min(retryAfter * 1000, 10_000);
  }
  return Math.min(1000 * 2 ** attempt, 8000);
}

async function githubFetch(path: string, headers: Record<string, string>): Promise<Response> {
  return fetch(`${GITHUB_API}${path}`, {
    headers,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

async function github(
  path: string,
  ttlSeconds: number,
): Promise<{ status: number; data: unknown }> {
  const cached = cache.get(path);
  if (cached && cached.expires > Date.now()) {
    return cached;
  }
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'angular-challenges-website',
  };
  const token = process.env['GITHUB_TOKEN'];
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await githubFetch(path, headers);
    // 403/429 are GitHub's primary and secondary rate limits: back off and retry.
    for (let attempt = 0; attempt < RATE_LIMIT_RETRIES; attempt++) {
      if (response.status !== 403 && response.status !== 429) {
        break;
      }
      await delay(retryDelayMs(response, attempt));
      response = await githubFetch(path, headers);
    }
  } catch (error) {
    if (cached) {
      // Serve stale data instead of surfacing a network or timeout error.
      return cached;
    }
    console.error('GitHub request failed', path, error);
    return { status: 503, data: { error: 'github request failed' } };
  }

  const data = await response.json().catch(() => null);
  const entry = { status: response.status, data, expires: Date.now() + ttlSeconds * 1000 };
  if (response.ok) {
    setCache(path, entry);
  } else if (cached) {
    // Serve stale data instead of surfacing a rate-limit error.
    return cached;
  }
  return entry;
}

interface GithubLabel {
  name: string;
}

/** Maps items concurrently, at most `limit` at a time. */
async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index]);
    }
  });
  await Promise.all(workers);
  return results;
}

/**
 * Runs a search query across all result pages, concurrently but capped to
 * stay clear of GitHub's secondary rate limits. The search API caps a single
 * query at 1000 results (10 pages), so the query is additionally partitioned
 * per creation year; each year's page 1 reveals via total_count how many more
 * pages need fetching.
 *
 * A failing page marks the result `partial` rather than discarding every page
 * already fetched; `null` is only returned when no page at all could be read.
 */
async function searchAllIssues(
  baseQuery: string,
  ttlSeconds: number,
): Promise<{ items: any[]; partial: boolean } | null> {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - REPO_FIRST_YEAR + 1 },
    (_, i) => REPO_FIRST_YEAR + i,
  );
  const pageUrl = (year: number, page: number) => {
    const query = encodeURIComponent(
      `repo:${REPO} is:pr ${baseQuery} created:${year}-01-01..${year}-12-31`,
    );
    return `/search/issues?q=${query}&per_page=100&page=${page}`;
  };

  const firstPages = await mapLimit(years, 4, (year) => github(pageUrl(year, 1), ttlSeconds));

  const items: any[] = [];
  const remaining: string[] = [];
  let partial = false;
  let succeeded = 0;
  for (const [index, { status, data }] of firstPages.entries()) {
    if (status !== 200) {
      partial = true;
      continue;
    }
    succeeded++;
    const { items: batch = [], total_count: total = 0 } = data as {
      items: any[];
      total_count: number;
    };
    items.push(...batch);
    const pageCount = Math.min(Math.ceil(total / 100), 10);
    for (let page = 2; page <= pageCount; page++) {
      remaining.push(pageUrl(years[index], page));
    }
  }

  if (succeeded === 0) {
    return null;
  }

  const restPages = await mapLimit(remaining, 4, (url) => github(url, ttlSeconds));
  for (const { status, data } of restPages) {
    if (status !== 200) {
      partial = true;
      continue;
    }
    items.push(...((data as { items: any[] }).items ?? []));
  }
  return { items, partial };
}

interface LeaderboardEntry {
  login: string;
  avatar: string;
  count: number;
}

function toLeaderboard(
  counts: Map<string, { avatar: string; values: Set<string | number> }>,
): LeaderboardEntry[] {
  return [...counts.entries()]
    .filter(([login]) => !EXCLUDED_USERS.has(login))
    .map(([login, entry]) => ({ login, avatar: entry.avatar, count: entry.values.size }))
    .sort((a, b) => b.count - a.count);
}

function accumulate(
  counts: Map<string, { avatar: string; values: Set<string | number> }>,
  item: any,
  value: string | number,
): void {
  const login = item.user?.login;
  if (!login) {
    return;
  }
  const entry = counts.get(login) ?? { avatar: item.user.avatar_url, values: new Set() };
  entry.values.add(value);
  counts.set(login, entry);
}

export const githubApi = Router();

/** The signed-in user, based on the auth cookie. */
githubApi.get('/me', async (req, res) => {
  const token = readAuthCookie(req);
  if (!token) {
    res.status(401).json({ error: 'not signed in' });
    return;
  }
  let response: Response;
  try {
    response = await fetch(`${GITHUB_API}/user`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'User-Agent': 'angular-challenges-website',
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch {
    res.status(503).json({ error: 'github request failed' });
    return;
  }
  if (!response.ok) {
    res.status(401).json({ error: 'invalid token' });
    return;
  }
  const user = (await response.json()) as any;
  res.set('Cache-Control', 'private, no-store');
  res.json({ login: user.login, avatar: user.avatar_url });
});

/** 👍 a solution PR on behalf of the signed-in user. */
githubApi.post('/pulls/:number/react', async (req, res) => {
  const token = readAuthCookie(req);
  if (!token) {
    res.status(401).json({ error: 'not signed in' });
    return;
  }
  const number = Number(req.params['number']);
  if (!Number.isInteger(number) || number <= 0) {
    res.status(400).json({ error: 'invalid PR number' });
    return;
  }
  let response: Response;
  try {
    response = await fetch(`${GITHUB_API}/repos/${REPO}/issues/${number}/reactions`, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'User-Agent': 'angular-challenges-website',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: '+1' }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch {
    res.status(503).json({ error: 'github request failed' });
    return;
  }
  if (!response.ok) {
    res.status(response.status).json({ error: 'reaction failed' });
    return;
  }
  res.status(201).json({ ok: true });
});

const BOARD_QUERIES: Record<string, string> = {
  answers: 'label:"answer"',
  challenges: 'label:"challenge-creation"',
  commit: 'no:label',
};

async function buildLeaderboard(
  board: string,
): Promise<{ entries: LeaderboardEntry[]; partial: boolean } | null> {
  const result = await searchAllIssues(BOARD_QUERIES[board], 1800);
  if (!result) {
    return null;
  }
  const counts = new Map<string, { avatar: string; values: Set<string | number> }>();
  for (const item of result.items) {
    if (board === 'answers') {
      const challenge = item.labels
        ?.map((l: GithubLabel) => Number(l.name))
        .find((n: number) => Number.isInteger(n) && n > 0);
      if (challenge) {
        accumulate(counts, item, challenge);
      }
    } else {
      accumulate(counts, item, item.number);
    }
  }
  return { entries: toLeaderboard(counts), partial: result.partial };
}

/**
 * Aggregated leaderboards with stale-while-revalidate semantics: a stale
 * board is served immediately while a single refresh runs in the background.
 */
const boardCache = new Map<string, { expires: number; entries: LeaderboardEntry[] }>();
const boardRefreshing = new Map<string, Promise<LeaderboardEntry[] | null>>();
const BOARD_TTL_MS = 30 * 60 * 1000;
/** A board built from an incomplete page set is cached briefly, then retried. */
const BOARD_PARTIAL_TTL_MS = 5 * 60 * 1000;

function refreshBoard(board: string): Promise<LeaderboardEntry[] | null> {
  let inflight = boardRefreshing.get(board);
  if (!inflight) {
    inflight = buildLeaderboard(board)
      .then((result) => {
        if (!result) {
          return null;
        }
        boardCache.set(board, {
          expires: Date.now() + (result.partial ? BOARD_PARTIAL_TTL_MS : BOARD_TTL_MS),
          entries: result.entries,
        });
        return result.entries;
      })
      .finally(() => boardRefreshing.delete(board));
    boardRefreshing.set(board, inflight);
  }
  return inflight;
}

/** Leaderboards, aggregated server-side and cached for 30 minutes. */
githubApi.get('/leaderboard/:board', async (req, res) => {
  const board = req.params['board'];
  if (!BOARD_QUERIES[board]) {
    res.status(404).json({ error: 'unknown leaderboard' });
    return;
  }

  const cached = boardCache.get(board);
  if (cached) {
    if (cached.expires <= Date.now()) {
      // Stale: kick off one background refresh, still answer instantly.
      void refreshBoard(board).catch(() => undefined);
    }
    res.set('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');
    res.json({ entries: cached.entries });
    return;
  }

  const entries = await refreshBoard(board);
  if (!entries) {
    res.status(503).json({ error: 'github request failed' });
    return;
  }
  res.set('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');
  res.json({ entries });
});

/** Repository stats for the landing page. */
githubApi.get('/stats', async (_req, res) => {
  const { status, data } = await github(`/repos/${REPO}`, 900);
  if (status !== 200) {
    res.status(503).json({ error: 'github request failed' });
    return;
  }
  const repo = data as any;
  res.set('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600');
  res.json({
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    openIssues: repo.open_issues_count,
  });
});

/** Active sponsors (needs a GITHUB_TOKEN with sponsorship read access). */
githubApi.get('/sponsors', async (_req, res) => {
  const token = process.env['GITHUB_TOKEN'];
  if (!token) {
    res.set('Cache-Control', 'public, s-maxage=900');
    res.json({ sponsors: [] });
    return;
  }
  const cached = cache.get('sponsors');
  if (cached && cached.expires > Date.now()) {
    res.set('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=86400');
    res.json(cached.data);
    return;
  }
  const query = `query {
    user(login: "tomalaforge") {
      sponsorshipsAsMaintainer(activeOnly: true, first: 100) {
        nodes {
          sponsorEntity {
            ... on User { login avatarUrl }
            ... on Organization { login avatarUrl }
          }
        }
      }
    }
  }`;
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'angular-challenges-website',
      },
      body: JSON.stringify({ query }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    const data = (await response.json()) as any;
    if (data?.errors) {
      console.error('sponsors graphql failed', JSON.stringify(data.errors));
      res.status(503).json({ error: data.errors[0]?.message ?? 'graphql failed' });
      return;
    }
    const sponsors =
      data?.data?.user?.sponsorshipsAsMaintainer?.nodes
        ?.map((n: any) => n?.sponsorEntity)
        .filter(Boolean)
        .map((s: any) => ({ login: s.login, avatar: s.avatarUrl })) ?? [];
    const payload = { sponsors };
    setCache('sponsors', { expires: Date.now() + 900_000, status: 200, data: payload });
    res.set('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=86400');
    res.json(payload);
  } catch {
    res.status(503).json({ error: 'github request failed' });
  }
});

/** All solution PRs for a challenge, author solutions first, then by 👍. */
githubApi.get('/challenges/:number/solutions', async (req, res) => {
  const number = Number(req.params['number']);
  if (!Number.isInteger(number) || number <= 0) {
    res.status(400).json({ error: 'invalid challenge number' });
    return;
  }
  const query = encodeURIComponent(`repo:${REPO} is:pr label:${number}`);
  const { status, data } = await github(
    `/search/issues?q=${query}&per_page=100&sort=reactions-+1&order=desc`,
    300,
  );
  if (status !== 200) {
    res.status(status === 403 ? 503 : status).json({ error: 'github request failed' });
    return;
  }
  const items = (data as { items: any[] }).items ?? [];
  const solutions = items
    .filter((item) =>
      item.labels?.some((l: GithubLabel) => l.name === 'answer' || l.name === 'answer author'),
    )
    .map((item) => ({
      number: item.number,
      title: item.title,
      login: item.user?.login,
      avatar: item.user?.avatar_url,
      isAuthor: item.labels.some((l: GithubLabel) => l.name === 'answer author'),
      state: item.state,
      merged: !!item.pull_request?.merged_at,
      thumbsUp: item.reactions?.['+1'] ?? 0,
      comments: item.comments ?? 0,
      createdAt: item.created_at,
      htmlUrl: item.html_url,
    }))
    .sort((a, b) => Number(b.isAuthor) - Number(a.isAuthor) || b.thumbsUp - a.thumbsUp);

  res.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
  res.json({ solutions });
});

/** PR metadata for the diff header. */
githubApi.get('/pulls/:number', async (req, res) => {
  const number = Number(req.params['number']);
  if (!Number.isInteger(number) || number <= 0) {
    res.status(400).json({ error: 'invalid PR number' });
    return;
  }
  const { status, data } = await github(`/repos/${REPO}/pulls/${number}`, 3600);
  if (status !== 200) {
    res.status(status === 403 ? 503 : status).json({ error: 'github request failed' });
    return;
  }
  const pr = data as any;
  res.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.json({
    number: pr.number,
    title: pr.title,
    login: pr.user?.login,
    avatar: pr.user?.avatar_url,
    state: pr.state,
    merged: pr.merged,
    createdAt: pr.created_at,
    htmlUrl: pr.html_url,
    additions: pr.additions,
    deletions: pr.deletions,
    changedFiles: pr.changed_files,
  });
});

/** Changed files with patches for the diff view. */
githubApi.get('/pulls/:number/files', async (req, res) => {
  const number = Number(req.params['number']);
  if (!Number.isInteger(number) || number <= 0) {
    res.status(400).json({ error: 'invalid PR number' });
    return;
  }
  const files: any[] = [];
  for (let page = 1; page <= 3; page++) {
    const { status, data } = await github(
      `/repos/${REPO}/pulls/${number}/files?per_page=100&page=${page}`,
      3600,
    );
    if (status !== 200) {
      res.status(status === 403 ? 503 : status).json({ error: 'github request failed' });
      return;
    }
    const batch = data as any[];
    files.push(...batch);
    if (batch.length < 100) {
      break;
    }
  }
  res.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.json({
    files: files.map((f) => ({
      filename: f.filename,
      previousFilename: f.previous_filename,
      status: f.status,
      additions: f.additions,
      deletions: f.deletions,
      patch: f.patch ?? null,
      blobUrl: f.blob_url,
    })),
  });
});
