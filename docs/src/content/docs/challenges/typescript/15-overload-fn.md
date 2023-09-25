---
title: 🟠 Function Overload
description: Challenge 15 is about creating overload functions
---

:::note
WIP
:::

<div class="chip">Challenge #15</div>

## Information

Angular uses TypeScript, and mastering TypeScript can help you avoid runtime errors by catching them at compile time.

In this challenge, we have a function to create a vehicle. However, each vehicle type requires different mandatory properties.
Currently, we are getting an error at runtime if one property is missing and we don't get the return Type, which is not ideal.
One solution would be to create a separate function for each vehicle type, but for this challenge, I want to use the same function and have TypeScript automatically complete the properties depending on the type passed as the first parameter.

To achieve this, we will use overload functions.

## Statement

- Use function overload

---

:::note
Start the project by running: `npx nx serve overload``.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:15</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A15+label%3Aanswer"
    alt="Function Overload community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A15+label%3A'
    alt="Function Overload solution author">
    ▶︎ Author Answer
  </a>
  <a
    href='https://medium.com/ngconf/function-overloading-in-typescript-8236706b2c05'
    target="_blank"
    rel="noopener noreferrer"
    alt="Function Overload blog article">
    <svg aria-hidden="true" class="astro-yzt5nm4y astro-lq7oo3uf" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1.5rem;"><path d="M9 10h1a1 1 0 1 0 0-2H9a1 1 0 0 0 0 2Zm0 2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9Zm11-3.06a1.3 1.3 0 0 0-.06-.27v-.09c-.05-.1-.11-.2-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19h-.09a.88.88 0 0 0-.33-.11H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.94Zm-6-3.53L16.59 8H15a1 1 0 0 1-1-1V5.41ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5v3a3 3 0 0 0 3 3h3v9Zm-3-3H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Z"></path></svg>
     Blog Post
  </a>
</div>
