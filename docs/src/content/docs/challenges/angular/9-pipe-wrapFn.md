---
title: 🟠 Wrap Function Pipe
description: Challenge 9 is about creating a pipe to wrap component fonctions
---

:::note
WIP
:::

<div class="chip">Challenge #9</div>

The goal of this serie of 3 pipe challenges is to master PIPES in Angular.

Pure pipe are a very useful way to transform data from your template. The difference between calling a function and a pipe is that pure pire are memoized. So they won't be recalculated every change detection cycle if the inputs hasn't changed.

## Information:

In this second exercice, you are calling multiple functions inside your template. You can create a specific pipe for each of the functions but this will be too cumbersome.
The goal is to create a `wrapFn` pipe to wrap your callback function though a pipe. Your function MUST remain inside your component. `WrapFn` must be highly reusable.

## Constraints:

- must be strongly typed

---

:::note
Start the project by running: `npx nx serve pipe-intermediate`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:9</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A9+label%3Aanswer"
    alt="Wrap Function Pipe community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A9+label%3A'
    alt="Wrap Function Pipe solution author">
    ▶︎ Author Answer
  </a>
  <a
    href='https://medium.com/ngconf/boost-your-apps-performance-by-wrapping-your-functions-inside-a-pipe-7e889a901d1d'
    target="_blank"
    rel="noopener noreferrer"
    alt="Wrap Function Pipe blog article">
    <svg aria-hidden="true" class="astro-yzt5nm4y astro-lq7oo3uf" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1.5rem;"><path d="M9 10h1a1 1 0 1 0 0-2H9a1 1 0 0 0 0 2Zm0 2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9Zm11-3.06a1.3 1.3 0 0 0-.06-.27v-.09c-.05-.1-.11-.2-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19h-.09a.88.88 0 0 0-.33-.11H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.94Zm-6-3.53L16.59 8H15a1 1 0 0 1-1-1V5.41ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5v3a3 3 0 0 0 3 3h3v9Zm-3-3H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Z"></path></svg>
     Blog Post
  </a>
</div>
