---
title: 🟠 Highly Customizable CSS
description: Challenge 13 is about creating highly customizable CSS styles
author: thomas-laforge
challengeNumber: 13
command: angular-styling
sidebar:
  order: 104
---

## Information

Styling is an important aspect of a frontend developer's day job, but it is often underestimated. In Angular applications, I frequently see people using `@Input()` to customize the style of their components. However, `@Input()` should only be used for logic. Other techniques, such as **CSS variables** and **host-context** should be used for styling.

In this challenge, you will need to use both CSS variables and `:host-context` to remove all `@Input()` from your code.

## Constraints

- In your final submission, your component should not contain any lines of code. All styling should be handled within the decorator _(or external css files if you prefer)_

## Note

There is also another way to style the `TextStaticComponent` (see [PR](https://github.com/tomalaforge/angular-challenges/pull/341/files#diff-082bc0154adae46609f52c9e366d4768ae9278dcb495a9a7ec7cb0baf393fb1c))
