---
title: 🟠 Back-Button-Navigation
description: Challenge 55 is about overriding browser back button navigation
author: Ioannis-Tsironis
contributors:
  - tsironis13
challengeNumber: 55
command: angular-back-button-navigation
sidebar:
  order: 123
---

## Information

The goal of this challenge is to override the default behavior of the browser back button in Angular applications.

We have been prompted by the team's PO to provide a specific implementation when displaying dialog components and
native browser back button is clicked. Currently, Angular's default behavior when the native back button is clicked is
to remove the current history entry and go back to the previous route.

The initial state of the application is as follows:
When any dialog is displayed and the back button is clicked, any opened dialog is closed, and the app redirects to the previous page.

This behavior should be changed according to these requirements:

1. The requirements dictate a few different behaviors depending on which type of dialog is currently visible.
2. For example, we have a simple
   action dialog that should be closed on the back button click, but we **MUST** remain on the current visited route (/simple-action).
3. In addition, we have sensitive dialogs like the one on the '/sensitive-action' page that must open a confirmation dialog on a back button click.
4. The confirmation dialog in combination with the back button click should behave like the simple dialog action one; the confirmation dialog must be closed, and we must remain on the '/sensitive-action' page with the initial dialog still visible.

## Statement

Provide an abstract, generic approach to handling any type of dialog behavior when the native browser back button is clicked.
Some Typescript design patterns, in combination with the Angular features, could be utilized to support this kind of infrastructure.

## Constraints

- The implementation must not be static depending on the 2 dialog type behaviors presenting on this challenge but also scalable to support any
  new behavior requirements may arise in the future.

### Hint

<details>
  <summary>Hint 1</summary>

Use the `CanDeactivate` functional guard

</details>

<details>
  <summary>Hint 2</summary>

Material Design dialog documentation can be found [here](https://material.angular.io/components/dialog/overview)

</details>
