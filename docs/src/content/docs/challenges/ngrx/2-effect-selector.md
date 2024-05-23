---
title: 🟠 Effect vs Selector
description: Challenge 2 is about learning the difference between effects and selectors in NgRx
author: thomas-laforge
contributors:
  - tomalaforge
  - tomer953
  - svenson95
  - jdegand
  - LMFinney
challengeNumber: 2
command: ngrx-effect-vs-selector
blogLink: https://medium.com/@thomas.laforge/ngrx-effect-vs-reducer-vs-selector-58337ab59043
sidebar:
  order: 113
---

For this exercise, you will have a dashboard of activities displaying the name, the main teacher and a list of possible substitutes.

## Information

In NgRx, **selectors** is a very powerful tool that is often **misused**. You should use them as soon as you need to transform an already existing data in the store.

- You shouldn't store **derived state**. This is error-prone because when your data changes, you will have to change it at multiple places => you should have only one place of truth with that data, and every transformation should be done in a **selector**.

- Inside a component, you shouldn't transform a selector (using the map operator), and you shouldn't have to call a selector from a function in your view. The useful logic for preparing data for a component should be done in a **selector**.

## Statement

You will have to refactor this working example of a dashboard of activities.

## Constraints

- Only **one action** should be dispatched from a component (or none, if you can solve the problem with Effect lifecycle hooks).
- Status effect is useless. Using **combineLatest** should be a red flag. Effects are made for side effects, not for transforming data. That's a selector's role.
- Status state might not be useful; it's only a **derived state** of existing state.
