---
title: 🟠 Form Array
description: Challenge 64 is about building dynamic lists with FormArray and migrating the form to Signal-based forms
author: thomas-laforge
contributors:
  - tomalaforge
challengeNumber: 64
command: forms-form-array
sidebar:
  order: 126
---

## Information

You already built a registration form with Reactive Forms (FormGroup / FormControl / FormArray). Now you will refactor it to **Signal-based forms** while keeping the UX, validations, and dynamic add/remove behavior.

You can learn more about Signal-based forms in the [Angular documentation](https://angular.dev/guide/forms/signals-based-forms).

## Statement

The application contains a single-page registration form with:

- **Name** (required)
- **Pseudo** (required)
- **Contacts** (FormArray)
  - First name (required)
  - Last name (required)
  - Relation (required)
  - Email (required, valid email)
- **Emails** (FormArray)
  - Type (required)
  - Email (required, valid email)

Current behavior:

- Users can add or remove contacts and emails.
- Submit marks all controls as touched and blocks submission when the form is invalid.
- Validation errors appear when fields are touched/dirty or after submitting.
- Submitted data is displayed as JSON after a successful submission.

### Challenge Goal

Refactor the form to **Signal-based forms** while preserving the UI, validations, and dynamic FormArray behavior.

### Expected Result

After completing the challenge, your form should:

- Use Signal-based forms instead of `FormGroup`, `FormControl`, and `FormArray`.
- Keep the same validation rules for all fields.
- Preserve add/remove behavior for contacts and emails.
- Keep the submit gating and submitted data preview.
- Pass all existing tests.

## Constraints

- Use only Signal-based forms (no `FormGroup`, `FormControl`, or `FormArray`).
- Preserve all current validations (required + email).
- Keep the same UX and Tailwind styling.
- All existing tests must pass.

:::tip[TDD Approach]
You can run tests in watch mode to refactor using Test-Driven Development (TDD):

```bash
nx test forms-form-array
```

This will re-run tests automatically as you make changes, helping you ensure all functionality works correctly during your migration.
:::
