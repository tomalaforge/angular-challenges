---
title: 🟢 @RouterInput()
description: Challenge 22 is about using the @Input decorator to retreive router params.
sidebar:
  order: 5
---

<div class="chip">Challenge #22</div>

## Information

In this application, we retrieve three pieces of information inside our `TestComponent` provided by the router:

- We want to retrieve `testId` found inside the params of the URL.
- We want to obtain `user` located within the query parameters of the URL.
- We want to access `permission` set inside the `data` object of the route.

In Angular versions 15 or earlier, we use `ActivatedRoute` to obtain all this information and receive them through observables to listen for URL changes.

In version 16, Angular introduced a new `Input` that can listen to route data. You can read more about it [here](https://medium.com/ngconf/accessing-route-params-in-angular-1f8e12770617).
.

## Statement

The goal of this exercice is to refactor the code to use the new `RouterInput` strategy.

---

:::note
Start the project by running: `npx nx serve router-input`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:22</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A22+label%3Aanswer"
    alt="@RouterInput() community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A22+label%3A"answer+author"'
    alt="@RouterInput() solution author">
    ▶︎ Author Answer
  </a>
  <a
    href='https://medium.com/ngconf/accessing-route-params-in-angular-1f8e12770617'
    target="_blank"
    rel="noopener noreferrer"
    alt="@RouterInput() blog article">
    <svg aria-hidden="true" class="astro-yzt5nm4y astro-lq7oo3uf" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1.5rem;"><path d="M9 10h1a1 1 0 1 0 0-2H9a1 1 0 0 0 0 2Zm0 2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9Zm11-3.06a1.3 1.3 0 0 0-.06-.27v-.09c-.05-.1-.11-.2-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19h-.09a.88.88 0 0 0-.33-.11H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.94Zm-6-3.53L16.59 8H15a1 1 0 0 1-1-1V5.41ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5v3a3 3 0 0 0 3 3h3v9Zm-3-3H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Z"></path></svg>
     Blog Post
  </a>
</div>
