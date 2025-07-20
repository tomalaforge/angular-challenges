---
title: Rebase your branch
description: Guide to rebase a branch to latest change
contributors:
  - tomalaforge
sidebar:
  order: 6
---

Sometimes, changes may be added to the project. I'll attempt to make changes that won't break anything, but sometimes it's inevitable.

Most of the time, you won't need to rebase your solution, but here is a guide to help you know how to do it.

:::note
This guide is applicable to any Open Source Project.
:::

## Steps to rebase your branch

### Sync your repository

First, you need to synchronize your fork to ensure it's up to date with the forked repository.

You can achieve this by clicking the Sync fork button on the main page of your fork.

![Sync project header](../../../assets/fork-sync.png)

The image above shows that my branch is behind of the main branch by 8 commits, and I need to synchronize it to be up to date.

![Sync project update modal](../../../assets/sync-fork-update.png)

### Open a terminal

Open any terminal of your choice, either the one from your favorite IDE or a standalone instance.

### Git

Follow the following commands to rebase your local branch:

- git checkout main
- git pull
- git checkout [your branch]
- git rebase main
- Resolve Conflicts

At this step, the rebase may stop because your local branch has conflicting files with the main branch. Correct them. After this is done:

- git add .
- git rebase --continue

If your branch doesn't have any conflicts, a success message will be shown.

### Push your work back to the remote branch

Finally, push your work back to GitHub:

- git push -f
