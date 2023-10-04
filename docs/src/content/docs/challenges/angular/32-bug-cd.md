---
title: 🟠 Change Detection Bug
description: Challenge 32 is about debugging an application that has issue when change detection is triggered
sidebar:
  order: 105
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

<div class="chip">Challenge #32</div>

:::note
This challenge is inspired by a real-life example that I simplified to create this nice challenge.
:::

## Information

In this small application, we have a navigation menu to route our application to either `BarComponent` or `FooComponent`. However our application is not loading and no errors are displayed inside the console.

## Statement

The goal of the challenge is to debug this application and make it work.

## Hints

<details>
  <summary>Hint 1</summary>
  
  If you comment out `routerLinkActive="isSelected"` inside `NavigationComponent`: the application loads correctly.
</details>

<details>
  <summary>Hint 2</summary>

If you open the [`RouterLinkActive` source code](https://github.com/angular/angular/blob/main/packages/router/src/directives/router_link_active.ts) and go to **line 196**, Angular is calling `this.cdr.markForCheck` inside a microTask which triggers a new CD cycle. If you comment out this line, the application loads again, however the bug is not inside the Angular Framework. 😅😯

</details>

---

:::note
Start the project by running: `npx nx serve bug-cd`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:32</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A32+label%3Aanswer"
    alt="Change Detection Bug community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A32+label%3A"answer+author"'
    alt="Change Detection Bug solution author">
    ▶︎ Author Answer
  </a>
    <a
    href="https://medium.com/ngconf/function-calls-inside-template-are-dangerous-15f9822a6629"
    target="_blank"
    rel="noopener noreferrer"
    alt="Change Detection Bug blog article">
    <svg aria-hidden="true" class="astro-yzt5nm4y astro-lq7oo3uf" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1.5rem;"><path d="M9 10h1a1 1 0 1 0 0-2H9a1 1 0 0 0 0 2Zm0 2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9Zm11-3.06a1.3 1.3 0 0 0-.06-.27v-.09c-.05-.1-.11-.2-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19h-.09a.88.88 0 0 0-.33-.11H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.94Zm-6-3.53L16.59 8H15a1 1 0 0 1-1-1V5.41ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5v3a3 3 0 0 0 3 3h3v9Zm-3-3H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Z"></path></svg>
     Blog Post
  </a>
  </div>
