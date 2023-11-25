---
title: 🟠 Highly Customizable CSS
description: Challenge 13 is about creating highly customizable CSS styles
author: thomas-laforge
challengeNumber: 13
command: angular-styling
sidebar:
  order: 104
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

## Information

Styling is an important aspect of a frontend developer's day job, but it is often underestimated. In Angular applications, I frequently see people using `@Input()` to customize the style of their components. However, `@Input()` should only be used for logic; and other techniques, such as CSS variables and host-context, should be used for styling.

In this challenge, you will need to use both CSS variables and `:host-context` to remove all `@Input()` from your code.

## Constraints:

- In your final submission, your component should not contain any lines of code. All styling should be handled within the decorator _(or external css files if you prefer)_
