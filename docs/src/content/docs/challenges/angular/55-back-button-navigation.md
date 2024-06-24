---
title: 🟠 Back-Button-Navigation
description: Challenge 55 is about overriding browser back button navigation
author: Ioannis-Tsironis
contributors:
  - tomalaforge
challengeNumber: 55
command: angular-back-button-navigation
sidebar:
  order: 123
  badge: New
---

## Information

The goal of this challenge is to override the default behavior of the browser back button in Angular applications.

We have been prompted by the team's PO to provide a specific implementation when displaying dialog components and
native browser back button is clicked. Currently, the Angular's default behavior when the native back button is clicked is
to remove the current history entry and go back to previous visited route.

The initial state of the application performs as following:
When any dialog is displayed and back button is clicked, any opened dialog is closed and app redirects to previous page.
This behavior should be changed according to new requirements.

The requirements dictate a few different behaviors depending on which type of dialog is currently visible. For exmaple, we have a simple
action dialog that should be closed on back button click but we **MUST** remain on the current visited route (/simple-action).
In addition, we have sensitive dialogs like the one on '/sensitive-action' page that must open a confirmation dialog on back button click.
Confirmation dialog in combination with back button click should behave like the simple dialog action one; the confirmation dialog must be
closed and we must remain on '/sensitive-action' page with the initial dialog still visible.

## Statement

Provide an abstract generic approach to handle any type of dialog behavior when native browser back button is clicked.

## Constraints

- The implementation must not be static depending on the 2 dialog type behaviors presenting on this challenge but also scalable to support any
  new behavior requirements may arrise in the future.

### Hint

<details>
  <summary>Hint 1</summary>
  Use the CanDeactivate functional guard 
</details>
