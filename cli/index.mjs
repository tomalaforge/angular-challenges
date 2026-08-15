#!/usr/bin/env node
/**
 * angular-challenges — try a challenge with one command.
 *
 *   npx angular-challenges start <number>   fork + clone + install + branch + open IDE + serve
 *   npx angular-challenges submit           push your answer branch and open the PR page
 *
 * Zero dependencies; needs git and Node >= 20. Uses the GitHub CLI (gh) when
 * available, and falls back to the browser for anything that needs an account.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';

const UPSTREAM = 'tomalaforge/angular-challenges';
const REPO_NAME = 'angular-challenges';
const WEBSITE = 'https://angular-challenges.vercel.app';

const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const pink = (s) => `\x1b[35m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const step = (s) => console.log(`\n${pink('▸')} ${bold(s)}`);
const info = (s) => console.log(`  ${s}`);

const isWindows = process.platform === 'win32';

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { stdio: 'inherit', shell: isWindows, ...options });
  if (result.status !== 0 && !options.allowFailure) {
    console.error(red(`\n✗ \`${command} ${args.join(' ')}\` failed.`));
    process.exit(1);
  }
  return result.status === 0;
}

function capture(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', shell: isWindows, ...options });
  return result.status === 0 ? result.stdout.trim() : null;
}

function has(command) {
  return capture(isWindows ? 'where' : 'which', [command]) !== null;
}

function openInBrowser(url) {
  const opener = isWindows ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  spawnSync(opener, [url], { shell: isWindows, stdio: 'ignore' });
  info(`Opened ${dim(url)}`);
}

async function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = (await rl.question(`  ${question}`)).trim();
  rl.close();
  return answer;
}

async function forkExists(login) {
  try {
    const response = await fetch(`https://api.github.com/repos/${login}/${REPO_NAME}`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'angular-challenges-cli' },
    });
    if (response.status !== 200) {
      return false;
    }
    const repo = await response.json();
    return repo.fork === true || repo.full_name.toLowerCase() !== UPSTREAM;
  } catch {
    return false;
  }
}

/** GitHub login: gh CLI, then git config, then ask. */
async function githubLogin() {
  const fromGh = capture('gh', ['api', 'user', '-q', '.login']);
  if (fromGh) {
    return fromGh;
  }
  const fromConfig = capture('git', ['config', '--global', 'github.user']);
  if (fromConfig) {
    return fromConfig;
  }
  return await ask('Your GitHub username: ');
}

/** Root of the clone: cwd if already inside one, ./angular-challenges, or null. */
function findExistingClone() {
  const gitRoot = capture('git', ['rev-parse', '--show-toplevel']);
  if (gitRoot) {
    const origin = capture('git', ['remote', 'get-url', 'origin'], { cwd: gitRoot }) ?? '';
    if (origin.includes(`/${REPO_NAME}`)) {
      return gitRoot;
    }
  }
  const local = resolve(REPO_NAME);
  if (existsSync(join(local, '.git'))) {
    return local;
  }
  return null;
}

function findChallengeApp(repoDir, number) {
  const appsDir = join(repoDir, 'apps');
  for (const category of readdirSync(appsDir)) {
    const categoryDir = join(appsDir, category);
    let entries;
    try {
      entries = readdirSync(categoryDir);
    } catch {
      continue;
    }
    for (const dir of entries) {
      if (dir.startsWith(`${number}-`)) {
        let project = null;
        try {
          project = JSON.parse(readFileSync(join(categoryDir, dir, 'project.json'), 'utf8')).name;
        } catch {
          /* project.json is optional */
        }
        return { path: `apps/${category}/${dir}`, project };
      }
    }
  }
  return null;
}

function openEditor(repoDir, challengePath) {
  for (const editor of ['code', 'cursor', 'windsurf', 'webstorm', 'idea']) {
    if (has(editor)) {
      const args =
        editor === 'code' || editor === 'cursor' || editor === 'windsurf'
          ? [repoDir, ...(challengePath ? ['--goto', join(repoDir, challengePath, 'README.md')] : [])]
          : [repoDir];
      spawnSync(editor, args, { shell: isWindows, stdio: 'ignore' });
      info(`Opened the project in ${bold(editor)}.`);
      return;
    }
  }
  info(dim('No editor CLI found (code/cursor/windsurf/webstorm/idea) — open the folder manually.'));
}

async function start(number) {
  if (!Number.isInteger(number) || number <= 0) {
    console.error(red('Usage: npx angular-challenges start <challenge-number>'));
    process.exit(1);
  }
  if (!has('git')) {
    console.error(red('git is required: https://git-scm.com'));
    process.exit(1);
  }

  console.log(`\n${bold(`Angular Challenges — challenge #${number}`)}`);

  step('GitHub account');
  const login = await githubLogin();
  if (!login) {
    console.error(red('A GitHub account is required to submit your answer.'));
    process.exit(1);
  }
  info(`Hi ${bold('@' + login)}!`);

  step('Fork');
  if (await forkExists(login)) {
    info(`Fork ${dim(`${login}/${REPO_NAME}`)} already exists.`);
  } else if (has('gh') && capture('gh', ['auth', 'status'])) {
    run('gh', ['repo', 'fork', UPSTREAM, '--clone=false']);
  } else {
    info('Opening GitHub so you can fork the repository…');
    openInBrowser(`https://github.com/${UPSTREAM}/fork`);
    await ask('Press Enter once the fork is created… ');
    if (!(await forkExists(login))) {
      console.error(red(`Could not find ${login}/${REPO_NAME} on GitHub.`));
      process.exit(1);
    }
  }

  step('Clone');
  let repoDir = findExistingClone();
  if (repoDir) {
    info(`Reusing existing clone at ${dim(repoDir)}.`);
  } else {
    repoDir = resolve(REPO_NAME);
    run('git', ['clone', `https://github.com/${login}/${REPO_NAME}.git`, repoDir]);
  }
  const git = (args, options = {}) => run('git', args, { cwd: repoDir, ...options });
  if (!capture('git', ['remote', 'get-url', 'upstream'], { cwd: repoDir })) {
    git(['remote', 'add', 'upstream', `https://github.com/${UPSTREAM}.git`]);
  }
  git(['fetch', 'upstream', 'main']);

  step(`Branch answer-${number}`);
  const branch = `answer-${number}`;
  const exists = capture('git', ['rev-parse', '--verify', branch], { cwd: repoDir });
  if (exists) {
    git(['switch', branch]);
    info(`Switched to existing branch ${dim(branch)}.`);
  } else {
    git(['switch', '-c', branch, 'upstream/main']);
  }

  step('Install dependencies');
  if (!has('pnpm')) {
    info('pnpm not found — enabling it via corepack…');
    run('corepack', ['enable', 'pnpm'], { allowFailure: true });
  }
  run(has('pnpm') ? 'pnpm' : 'npm', ['install'], { cwd: repoDir });

  const challenge = findChallengeApp(repoDir, number);

  step('Open your editor');
  openEditor(repoDir, challenge?.path);

  console.log(`
${green('✓ You are all set!')}

  Challenge code:  ${bold(challenge?.path ?? 'see the challenge doc — this one lives outside apps/')}
  When you are done: ${bold(`npx angular-challenges submit`)} ${dim('(from the repo folder)')}
`);

  if (challenge?.project) {
    step(`Serve (npx nx serve ${challenge.project}) — Ctrl+C to stop`);
    run('npx', ['nx', 'serve', challenge.project], { cwd: repoDir, allowFailure: true });
  }
}

async function submit() {
  const repoDir = findExistingClone();
  if (!repoDir) {
    console.error(red('Run this from inside your angular-challenges clone.'));
    process.exit(1);
  }
  const branch = capture('git', ['branch', '--show-current'], { cwd: repoDir });
  const match = branch?.match(/^answer-(\d+)$/);
  if (!match) {
    console.error(red(`Current branch is "${branch}" — expected an answer-<number> branch.`));
    process.exit(1);
  }
  const number = match[1];

  step(`Push ${branch}`);
  run('git', ['push', '-u', 'origin', branch], { cwd: repoDir });

  const origin = capture('git', ['remote', 'get-url', 'origin'], { cwd: repoDir }) ?? '';
  const login = origin.match(/github\.com[/:]([^/]+)\//)?.[1];

  step('Open the pull request');
  const title = encodeURIComponent(`Answer:${number}`);
  const url = `https://github.com/${UPSTREAM}/compare/main...${login}:${branch}?quick_pull=1&title=${title}`;
  openInBrowser(url);
  console.log(`
${green('✓ Almost there!')} Review the diff and click ${bold('Create pull request')}.
  ${dim(`Keep the title "Answer:${number}" so your PR is picked up automatically.`)}
`);
}

const [command, argument] = process.argv.slice(2);
switch (command) {
  case 'start':
    await start(Number(argument));
    break;
  case 'submit':
    await submit();
    break;
  default:
    console.log(`
${bold('angular-challenges')} — solve challenges from ${WEBSITE}

  ${bold('npx angular-challenges start <number>')}   fork, clone, install, branch, serve
  ${bold('npx angular-challenges submit')}           push your answer and open the PR page
`);
    process.exit(command ? 1 : 0);
}
