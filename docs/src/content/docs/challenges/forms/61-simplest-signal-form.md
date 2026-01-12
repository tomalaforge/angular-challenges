---
title: 🟢 Simplest Signal Form
description: Challenge 61 is about migrating from Reactive Forms to the new Signal-based Forms API in Angular
author: thomas-laforge
contributors:
  - tomalaforge
challengeNumber: 61
command: forms-simplest-signal-form
sidebar:
  order: 24
---

## Information

Angular has introduced a new way to work with forms using Signals. This modern approach provides better type safety, reactivity, and a more intuitive API compared to traditional Reactive Forms. You can find more information about Signal-based forms in the [Angular documentation](https://angular.dev/guide/forms).

In this challenge, you will learn how to migrate a simple form from Reactive Forms (`FormControl` and `FormGroup`) to the new Signal-based Forms API.

## Statement

The application currently contains a simple form built with Reactive Forms using `FormControl` and `FormGroup`. The form includes the following fields:

- **Name** (required)
- **Last Name** (optional)
- **Age** (must be between 1 and 99)
- **Note** (optional)

Your goal is to **refactor this form to use Angular's new Signal-based Forms API** while maintaining the same functionality and validation rules.

### Current Implementation

The form currently uses:

- `FormGroup` to group form controls
- `FormControl` for individual fields
- `Validators` for validation rules
- `ReactiveFormsModule` for form directives

### Expected Result

After completing the challenge, your form should:

- Use Signal-based form instead of `FormControl` and `FormGroup`
- Maintain all existing validation rules
- Keep the same UI and user experience
- Display validation errors appropriately
- Submit and reset functionality should work as before
- **All existing tests should continue to pass** when running `nx test forms-simplest-signal-form`

:::tip[TDD Approach]
You can run tests in watch mode to refactor using Test-Driven Development (TDD):

```bash
nx test forms-simplest-signal-form
```

This will re-run tests automatically as you make changes, helping you ensure all tests continue to pass during your refactoring.
:::
