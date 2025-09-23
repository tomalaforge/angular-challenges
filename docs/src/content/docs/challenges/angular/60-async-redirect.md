---
title: 🟢 async-redirect
description: Challenge 60 is about using the new `redirectTo` function in Angular Router to modernize navigation logic.
author: thomas-laforge
contributors:
  - tomalaforge
challengeNumber: 60
command: angular-async-redirect
sidebar:
  order: 23
  badge: New
---

## Statement

In this challenge, you are working with an Angular application that currently uses a custom `navigate` method in `dashboard.ts` to handle route changes. With the introduction of the new `redirectTo` function in the Angular Router in v20, the goal is to modernize the codebase by removing the old `navigate` method and refactoring the application to use `redirectTo` for all redirection logic.

Your task is to:

- Locate and delete the `navigate` method in `dashboard.ts`.
- Refactor the application to use the new `redirectTo` function from the Angular Router wherever navigation is required.

This will help ensure the application leverages the latest Angular routing features and maintains best practices for navigation and redirection.
