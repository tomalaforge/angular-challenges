---
title: 🟠 Change Detection Bug
description: Challenge 32 is about debugging an application that has issue when change detection is triggered
author: thomas-laforge
contributors:
  - tomalaforge
  - tomer953
  - jdegand
  - LMFinney
challengeNumber: 32
command: angular-change-detection-bug
blogLink: https://medium.com/ngconf/function-calls-inside-template-are-dangerous-15f9822a6629
sidebar:
  order: 105
---

:::note
This challenge is inspired by a real-life example that I simplified to create this nice challenge.
:::

## Information

In this small application, we have a navigation menu to route our application to either `BarComponent` or `FooComponent`. However, our application is not loading and no errors are displayed inside the console.

## Statement

The goal of the challenge is to debug this application and make it work.

:::note
Without knowing the exact reason for the issue, you can "fix" the error and get the program to function. One such approach would be to memoize `getMenu`. The application might work again, but make sure you really understand the problem and its consequences. Making it work isn't always enough; fixing this bug in the wrong way can cause a loss of performance or lead to other problems later on.  
:::

## Hints

<details>
  <summary>Hint 1</summary>
  
  If you comment out `routerLinkActive="isSelected"` inside `NavigationComponent`, the application loads correctly.
</details>

<details>
  <summary>Hint 2</summary>

If you open the [`RouterLinkActive` source code](https://github.com/angular/angular/blob/main/packages/router/src/directives/router_link_active.ts) and go to **line 196**, Angular is calling `this.cdr.markForCheck` inside a microTask, which triggers a new CD cycle. If you comment out this line, the application loads again, however, the bug should not be fixed by changing the Angular source code. 😅😯

</details>
