---
title: 🔴 Utility Wrapper Pipe
description: Challenge 10 is about creating a pipe to wrap utilities
sidebar:
  order: 202
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

<div class="chip">Challenge #10</div>

The goal of this serie of 3 pipe challenges is to master PIPES in Angular.

Pure pipe are a very useful way to transform data from your template. The difference between calling a function and a pipe is that pure pire are memoized. So they won't be recalculated every change detection cycle if the inputs hasn't changed.

## Information:

In this third exercice, you want to access utils functions. Currently we cannot access them directly from your template. The goal is to create a specific pipe for this utils file where you will need to pass the name of the function you want to call and the needed arguments.

## Constraints:

- must be strongly typed

---

:::note
Start the project by running: `npx nx serve pipe-hard`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:10</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A10+label%3Aanswer"
    alt="Utility Wrapper Pipe community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A10+label%3A"answer+author"'
    alt="Utility Wrapper Pipe solution author">
    ▶︎ Author Answer
  </a>
  </div>
