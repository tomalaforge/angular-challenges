---
title: 🟢 catchError
description: Challenge 38 is about learning error handling with catchError rxjs operator
sidebar:
  order: 14
  badge: New
---

<div class="chip">Challenge #38</div>

## Information

In this application, we will learn the correct placement of a catchError operator. If wrongly placed, the overall subscription will get completed. And we will not be able to send more requests. Aim is to preserve overall subscription, by taking care of error notification from inner observables.
Possible correct values for which we should get a success response are posts, comments, albums, photos, todos, users

## Statement

Handle the error without completion of the subscription.

## Constraints

Users should be able to console log value/error each time clicks on the fetch button.

:::note
Start the project by running: `npx nx serve rxjs-catch-error`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:38</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A38+label%3Aanswer"
    alt="catchError community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A38+label%3A"answer+author"'
    alt="catchError solution author">
    ▶︎ Author Answer
  </a>
</div>
