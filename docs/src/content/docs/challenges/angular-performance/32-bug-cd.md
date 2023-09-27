---
title: 🟠 Change Detection Bug
description: Challenge 32 is about debugging an application that has issue when change detection is triggered
sidebar:
  order: 32
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

<div class="chip">Challenge #32</div>

This challenge is inspired by a real-life example that I simplified to create this nice challenge.

## Information

In this small application, we have a navigation menu to route our application to either `barComponent` or `FooComponent`. However our application is not loading and no errors are displayed inside the console.

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
  </div>
