---
title: Resolve a Challenge
description: Guide to resolve a challenge
---

In this guide, you will learn how to resolve a challenge and submit an answer to the main Github repository.

## Presentation

This repository is powered by [Nx](https://nx.dev/getting-started/intro). **Nx** is a monorepository allowing to store multiple application inside the same workspace. That's said, each challenges is a separate application. If you open the `apps` directory, you will found multiple directory all related to one challenge. Each directory is a complete standalone `Nx` application. To run and start with one, open your terminal and run

```bash
npx nx serve <APPLICATION_NAME>
```

:::note
If you are not sure of your APPLICATION_NAME, open the README.md file. The `serve` command is written inside with a link to the documentation challenge.
:::

:::note
If `nx` is installed globally on your device, you can avoid using `npx`.

If you want to install `nx` globally, run

```bash
npm i -g nx
```

:::

## Create a git branch

Before starting implementing your own solution to resolve a challenge, create a git branch to save your work.

```bash
git checkout -b <BRANCH_NAME>
```
