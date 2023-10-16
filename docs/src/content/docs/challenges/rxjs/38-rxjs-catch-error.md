---
title: 🟢 catchError
description: Challenge 38 is about learning obervable completion.
sidebar:
  order: 14
  badge: New
---

<div class="chip">Challenge #38</div>

## How to Use the Application

Our application features a form with a text input box and a "Fetch" button. Upon clicking the "Fetch" button, data is retrieved from a [free API](https://jsonplaceholder.typicode.com/){:target="\_blank"}.

The correct values for a successful response are limited to: posts, comments, albums, photos, todos, and users. Any other values will result in an error response.

## Bug

A bug has been identified in our application. Users are only able to successfully fetch data until an invalid request is sent. Once an error response is received, users are unable to send additional requests.

## Learnings

This application provides an opportunity to understand the correct placement of a `catchError` operator. If placed incorrectly, the overall subscription will be completed, preventing users from sending more requests. The goal is to preserve the overall subscription by handling error notifications from inner observables appropriately.

## Constraints

Users should be able to log the value/error each time they click the "Fetch" button.

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
