# Angular Challenges Website — Rework Spec

Replacement of the Astro/Starlight docs (`docs/`) with a fully standalone **Angular v22 SSR** application living in `website/`. English only for v1. Deployed as a **new Vercel project**.

## Goals

1. Modern landing page.
2. Same documentation structure as today: left sidebar with **Guides**, **Leaderboard**, **Challenges**.
3. **Main goal:** browse community solutions directly on the website — list of solution PRs per challenge, and a GitHub-like **split diff viewer** when you open one.
4. (Phase 2 — later) Embedded editor to solve a challenge in the browser and submit it as a PR.

## Tech stack

| Concern | Choice |
|---|---|
| Framework | Angular v22, standalone components, signals, zoneless |
| SSR | `@angular/ssr` with Express server (server routes for API + OAuth) |
| Styling | Tailwind CSS v4 |
| Content | Markdown files (copied from `docs/src/content/docs`, English only), rendered server-side with `marked` + `shiki` for syntax highlighting |
| Diff rendering | PR patches from GitHub API, parsed and rendered with a custom split-diff component (Shiki-highlighted) |
| Package manager | pnpm (own workspace, standalone from the Nx monorepo — allows Angular v22 while the monorepo stays on 21.x) |
| Hosting | Vercel (SSR server as a Vercel serverless function, static assets on the CDN) |
| Analytics | Google Analytics (same tag `G-6BXJ62W6G5`), Google AdSense (same client id) |
| Comments | giscus (same repo/category config as today) |
| Newsletter | SendPulse embedded form (same form id) |

## Directory layout

```
website/
  SPEC.md
  package.json            # standalone, not part of the Nx workspace
  angular.json
  vercel.json
  src/
    server.ts             # Express + Angular SSR + API routes
    main.ts / main.server.ts
    content/
      guides/*.md         # copied from docs (en only)
      challenges/<category>/*.md
      leaderboard/*.md    # intro texts
    app/
      layout/             # shell: header, sidebar, footer, mobile menu
      pages/
        landing/
        guides/
        leaderboard/
        challenges/
          challenge-detail/
          solutions-list/
          solution-diff/
      shared/             # markdown renderer, diff viewer, github api client, ui bits
  public/
```

## Routes (Angular Router, SSR)

| Route | Render mode | Description |
|---|---|---|
| `/` | prerender | Landing page |
| `/guides/:slug` | prerender | 7 guides (getting-started, resolve-challenge, checkout-answer, create-challenge, contribute, rebase, faq) |
| `/leaderboard/answers` `/leaderboard/challenges` `/leaderboard/commit` | SSR | Leaderboards from GitHub API |
| `/challenges/:category/:slug` | prerender (ISR-refreshable) | Challenge doc page |
| `/challenges/:category/:slug/solutions` | SSR | **NEW** — list of solution PRs |
| `/challenges/:category/:slug/solutions/:prNumber` | SSR | **NEW** — split diff view of one PR |
| `/auth/authorize`, `/auth/callback`, `/auth/logout` | server route | GitHub OAuth flow |
| `/api/*` | server route | JSON endpoints backing the pages (GitHub proxy + cache) |

Prerendered content pages get correct SEO meta (title, description, og tags) from the markdown frontmatter, matching what Starlight produces today.

## Layout & pages

### Landing page (rework)

Modern Tailwind design, dark-mode first (with light mode toggle), keeping today's content blocks:

- Sponsor banner (sponsor avatars via `/api/sponsors`, "Become a sponsor" CTA) — sponsors fetched with the server token, same as the current `api/sponsors.js`.
- Hero: logo, tagline "Start now and become an Angular Expert!", CTAs: *Get Started*, *Latest challenge*, *GitHub star*.
- Live GitHub stats strip (stars, forks, contributors, PRs merged) — cached server-side.
- Card grid: 65+ challenges, newsletter subscription, OSS maintainer, learn alongside others, contribute, interview prep.
- Footer: social links (GitHub, LinkedIn, X), attribution.

### Docs shell

- Left sidebar identical in structure to today: **Guides** (flat list), **Leaderboard** (3 entries, collapsible), **Challenges** (grouped by category: Angular, Forms, Nx, Performance, RxJS, …, ordered by `sidebar.order` / challenge number), with active-route highlighting, search-free v1 (see Open questions), mobile drawer.
- Right column: table of contents generated from markdown headings (desktop only).
- Header: logo + title, GitHub/LinkedIn/X icons, theme toggle, **Sign in with GitHub** button (avatar + logout when connected).

### Challenge detail page

- Markdown body (same content as today, including HTML `<details>` tips blocks).
- Info asides: how to get started, `npx nx serve <command>` with copy-to-clipboard.
- Footer metadata: author + contributors (avatars linking to GitHub), video/blog links when present in frontmatter.
- **NEW prominent "Browse solutions" button** → solutions list.
- giscus comment section (mapping: title, same as today).

### Solutions list (NEW — main goal)

`GET /api/challenges/:number/solutions` → GitHub search: PRs in `tomalaforge/angular-challenges` with labels `<challengeNumber>` + `answer` (and `answer author` surfaced separately as the author's solution), sorted by 👍 reactions.

UI: card list — author avatar/login, PR title, state (open/merged), 👍 count, comments count, created date, link to GitHub. Clicking a card opens the in-site diff view.

### Solution diff view (NEW — like the attached screenshot)

`GET /api/pulls/:number/files` → GitHub `pulls/:number/files` (per-file `patch`).

- **Split (side-by-side) view** like the screenshot: old/new line numbers, red removed / green added line backgrounds with char-level emphasis, collapsed unchanged regions with "N unmodified lines" expanders.
- Unified view toggle for mobile.
- File list header (tree or flat list) with per-file +/− counts; syntax highlighting via Shiki.
- Header: PR title, author, link to the PR on GitHub, 👍 reaction count. A reaction button ("this solution helped me 👍") when signed in.
- Handles GitHub API caveats: files without patches (binary/too large) show a "view on GitHub" fallback; >300 files pagination (never happens for challenges, but no crash).

### Leaderboards

Same three boards as today (challenges answered, challenges created, contributions), fed by cached server endpoints instead of client-side GitHub calls, so they render on the server and work for anonymous visitors without burning user rate limits.

## Authentication & GitHub API strategy

- **Reuse the existing GitHub OAuth app** (`GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` env vars) — one new callback URL must be added to it: `https://<new-domain>/auth/callback`.
- Token stored in an **httpOnly secure cookie** (improvement over today's localStorage), refresh handled server-side like today's `auth/refresh`.
- Signing in unlocks: reacting to solutions, higher rate limits for browsing, and (Phase 2) submitting challenges. Read-only browsing works anonymously.
- Server holds a **read-only PAT** (`GITHUB_TOKEN`) used for anonymous traffic, with an in-memory + `Cache-Control`/Vercel CDN cache (solutions list: 5 min; diffs: 1 h; leaderboards/stats/sponsors: 15 min) to stay far below rate limits.

## Vercel deployment

- New Vercel project (suggested name: `angular-challenges-website`) rooted at `website/`.
- Build: `pnpm build` (Angular SSR build) + `vercel.json` routing all non-static paths to the SSR function (Node 22 runtime).
- Env vars: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GITHUB_TOKEN`.
- Old docs project untouched; when the new site is validated, swap the domain over and retire `docs/`.

## Phase 2 (out of scope for now, spec'd later)

- "Try this challenge" button → embedded editor (StackBlitz WebContainers or Monaco — TBD).
- Submit flow: fork → branch → commit → PR from the user's account with correct title/labels (counts for the leaderboard).

## Milestones

1. **Scaffold**: Angular v22 SSR + Tailwind + Express server + Vercel deploy of a hello-world shell. ✅ deployable from day one.
2. **Content**: markdown pipeline, guides + challenge pages, sidebar, TOC, SEO meta.
3. **Solutions**: API endpoints + solutions list + split diff viewer.
4. **GitHub extras**: OAuth sign-in, leaderboards, stats, sponsors, reactions.
5. **Landing page** rework + giscus + newsletter + analytics.
6. Polish: 404, loading states, mobile, dark/light, redirects from old URLs.

## Open questions

1. **Search**: Starlight ships Pagefind search. v1 without search, or include a simple client-side search over titles? *(default: include a lightweight title/description search in the sidebar — cheap to do)*
2. **Old URL compatibility**: keep the exact Starlight paths (`/challenges/forms/48-avoid-losing-form-data/`) so existing links keep working when the domain swaps — assumed **yes**.
3. **Vercel access**: `vercel` CLI is not installed/authenticated on this machine, and login is interactive. Either run `vercel login` once in this workspace terminal, or create a token (vercel.com → Settings → Tokens) and provide it (`VERCEL_TOKEN`), and I'll create/link/deploy the project myself.
4. **Server PAT**: a fine-grained read-only `GITHUB_TOKEN` is needed for anonymous-traffic caching — to be created by Thomas and added to Vercel env (I'll list exact scopes: public repo read only).
