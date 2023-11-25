---
title: FAQ
description: Answer to question
sidebar:
  order: 7
---

<details>
  <summary>Why is my application not starting, or why do I encounter errors in my terminal when I run `nx serve`?</summary>
  
  Most of the time, this issue arises because your node_modules are outdated, and you need to update them by running `npm ci`.

If the installation process fails, you can resolve it by deleting your node_modules folder using the command `rm -rf node_modules` or `npx npkill` and then re-running `npm ci`.

If the problem persists, please report the issue [here](https://github.com/tomalaforge/angular-challenges/issues/new).

</details>
