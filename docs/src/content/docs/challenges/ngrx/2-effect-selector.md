---
title: 🟠 Effect vs Selector
description: Challenge 2 is about learning the difference between effects and selectors in NgRx
sidebar:
  order: 113
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

<div class="chip">Challenge #2</div>

For this exercice, you will have a dashboard of activities displaying the name, the main teacher and a list of subtitutes.

## Information

In NgRx, **selectors** is a very powerful tool often **misused**. You should use them as soon as you need to transform an already existing data in the store.

- You shouldn't store **derived state**. This is error prone because when your data change, you will have to change it at multiple places => you should have only one place of truth with that data, and every transformation should be done in a **selector**.

- Inside a component, you shouldn't transform a selector (using map operator), or you shouldn't have to call a selector from a function in your view. The useful data for a component should be done in a **selector**.

## Statement

You will have to Refactor this working example of a dashboard of activities.

## Contraints:

- Only **one action** should be dispatched from a component
- Status effect is useless. Using **combineLatest** should be a red flag. And Effect are made for side effect, not transforming data. That's a selector role
- Status state might not be useful, it's only a **derived state** of existing state.

---

:::note
Start the project by running: `npx nx serve ngrx-1`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:2</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A2+label%3Aanswer"
    alt="Effect vs Selector community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A2+label%3A"answer+author"'
    alt="Effect vs Selector solution author">
    ▶︎ Author Answer
  </a>
  <a
    href='https://medium.com/@thomas.laforge/ngrx-effect-vs-reducer-vs-selector-58337ab59043'
    target="_blank"
    rel="noopener noreferrer"
    alt="Effect vs Selector blog article">
    <svg aria-hidden="true" class="astro-yzt5nm4y astro-lq7oo3uf" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1.5rem;"><path d="M9 10h1a1 1 0 1 0 0-2H9a1 1 0 0 0 0 2Zm0 2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9Zm11-3.06a1.3 1.3 0 0 0-.06-.27v-.09c-.05-.1-.11-.2-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19h-.09a.88.88 0 0 0-.33-.11H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.94Zm-6-3.53L16.59 8H15a1 1 0 0 1-1-1V5.41ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5v3a3 3 0 0 0 3 3h3v9Zm-3-3H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Z"></path></svg>
     Blog Post
  </a>
</div>
