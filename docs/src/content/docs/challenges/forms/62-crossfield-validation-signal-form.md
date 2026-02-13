---
title: 🟢 Crossfield Validation with Reactive Forms
description: Challenge 62 is about implementing crossfield validation using Angular Reactive Forms where one field's validation depends on another field's value
author: thomas-laforge
contributors:
  - tomalaforge
challengeNumber: 62
command: forms-crossfield-validation-signal-form
sidebar:
  order: 25
---

## Information

Crossfield validation is a common requirement in forms where the validity of one field depends on the value of another field. For example:

- Password confirmation must match the password field
- End date must be after start date
- Conditional required fields based on another field's value

Angular Reactive Forms provides powerful tools to implement crossfield validation using custom validators. This challenge will teach you how to create custom validators that access multiple form controls and update validation dynamically.

You can learn more about form validation in the [Angular Forms documentation](https://angular.dev/guide/forms/reactive-forms#validating-form-input).

## Statement

The application contains a registration form built with Angular Reactive Forms (`FormGroup` and `FormControl`). The form includes the following fields:

- **Email** (required, must be a valid email)
- **Password** (required, minimum 6 characters)
- **Confirm Password** (required, must match the password field) 🔗
- **Start Date** (required)
- **End Date** (required, must be after start date) 🔗

The 🔗 symbol indicates fields with crossfield validation that depend on other fields.

### Current Implementation

The form currently uses:

- `FormGroup` to group form controls
- `FormControl` for individual fields
- `Validators` for basic validation rules
- **Custom crossfield validators** for password matching and date range validation
- `ReactiveFormsModule` for form directives

### Key Features Demonstrated

1. **Password Match Validator**: A custom validator that checks if the confirm password matches the password field
2. **Date Range Validator**: A custom validator that ensures the end date is after the start date
3. **Dynamic Validation Updates**: When the password or start date changes, the dependent fields are automatically re-validated

### Challenge Goal

Your goal is to **understand how crossfield validation works** and then **migrate this form to use Angular's new Signal-based Forms API** while maintaining all the crossfield validation logic.

### What You'll Learn

- How to create custom validators that access multiple form controls
- How to implement crossfield validation in Reactive Forms
- How to dynamically re-validate fields when their dependencies change
- How to migrate crossfield validation to Signal-based forms

### Expected Result

After completing the challenge, your form should:

- Use Signal-based forms instead of `FormControl` and `FormGroup`
- Maintain all existing crossfield validation rules
- Keep the same UI and user experience
- Display validation errors appropriately for crossfield validations
- Submit and reset functionality should work as before
- Ensure that when the password field changes, the confirm password is re-validated
- Ensure that when the start date changes, the end date is re-validated

:::tip[TDD Approach]
You can run tests in watch mode to refactor using Test-Driven Development (TDD):

```bash
nx test forms-crossfield-validation-signal-form
```

This will re-run tests automatically as you make changes, helping you ensure all functionality works correctly during your migration.
:::

## Constraints

- You must use only Signal-based forms (no `FormGroup` or `FormControl`)
- All crossfield validation logic must be preserved
- The password confirmation must update its validation when the password changes
- The end date must update its validation when the start date changes
- All existing tests must pass
