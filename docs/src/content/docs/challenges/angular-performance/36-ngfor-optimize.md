---
title: 🟢 NgFor Optimization
description: Challenge 36 is about ...
sidebar:
  order: 13
  badge: New
---

<div class="chip">Challenge #36</div>

## Information

In this application, we have a list of individuals that we can add, delete or update. If you open the developer Chrome panel by pressing **F12**, go to he <b>source</b> tab, and expand the element to see the list, you will notice that each time, you add, delete or update a list item, the entire DOM elements are destroyed and initialized again. (See video below).

<video controls src="https://github.com/tomalaforge/angular-challenges/assets/30832608/71b90307-3ee3-42c0-a532-b67ce4f20bf6">
</video>

We can also use the <b>Angular DevTool</b> to profile our application and understand what is happening inside our application. I will show you how to do it inside the following video.

<video controls src="https://github.com/tomalaforge/angular-challenges/assets/30832608/dd8108c6-1d89-4b05-9aa5-e760bd6f7f11">
</video>

:::note
If you don't know how to use it, read [the performance introduction page](/challenges/angular-performance/) first and come back after.
:::

If you need more information about `NgFor`, I invite you to read the [documentation](https://angular.io/api/common/NgFor) first.

## Statement

The goal of this challenge is to understand what is causing this DOM refresh and to solve it.

---

:::note
Start the project by running: `npx nx serve ngfor-optimize`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:36</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A36+label%3Aanswer"
    alt="NgFor Optimization community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A36+label%3A"answer+author"'
    alt="NgFor Optimization solution author">
    ▶︎ Author Answer
  </a>
</div>
