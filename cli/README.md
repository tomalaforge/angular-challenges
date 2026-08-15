# angular-challenges CLI

Try a challenge from [Angular Challenges](https://angular-challenges.vercel.app) with one command:

```bash
npx angular-challenges start 19
```

This will:

1. find your GitHub account (via the `gh` CLI if signed in, otherwise it asks),
2. fork `tomalaforge/angular-challenges` to your account (or reuse your fork),
3. ask where to clone your fork — default `./angular-challenges` (or reuse an existing clone),
4. create an `answer-19` branch from the latest upstream `main`,
5. run `pnpm install`,
6. open the project in your editor (VS Code, Cursor, Windsurf or JetBrains), and
7. serve the challenge app.

When your solution is ready:

```bash
npx angular-challenges submit
```

pushes your branch and opens a pre-filled pull request page (`Answer:19`).

## Options

- `--dir <path>` — clone location. Skips the question, so it also works in scripts:
  `npx angular-challenges start 19 --dir ~/code`. If the folder already has files
  in it, the clone goes into `<path>/angular-challenges`.

## Requirements

- Node.js ≥ 20 and git. `pnpm` is enabled automatically through corepack.
- A GitHub account. The [GitHub CLI](https://cli.github.com) is optional but makes forking seamless.

## Publishing (maintainers)

```bash
cd cli && npm publish
```
