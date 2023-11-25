---
title: 🟠 Effect vs Selector
description: Challenge 2 is about learning the difference between effects and selectors in NgRx
author: thomas-laforge
challengeNumber: 2
command: ngrx-effect-selector
blogLink: https://medium.com/@thomas.laforge/ngrx-effect-vs-reducer-vs-selector-58337ab59043
sidebar:
  order: 113
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

For this exercice, you will have a dashboard of activities displaying the name, the main teacher and a list of subtitutes.

## Information

In NgRx, **selectors** is a very powerful tool often **misused**. You should use them as soon as you need to transform an already existing data in the store.

- You shouldn't store **derived state**. This is error prone because when your data changes, you will have to change it at multiple places => you should have only one place of truth with that data, and every transformation should be done in a **selector**.

- Inside a component, you shouldn't transform a selector (using map operator), or you shouldn't have to call a selector from a function in your view. The useful data for a component should be done in a **selector**.

## Statement

You will have to Refactor this working example of a dashboard of activities.

## Contraints:

- Only **one action** should be dispatched from a component
- Status effect is useless. Using **combineLatest** should be a red flag. And Effect are made for side effect, not transforming data. That's a selector role
- Status state might not be useful, it's only a **derived state** of existing state.
