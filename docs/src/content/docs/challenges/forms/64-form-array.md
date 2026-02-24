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
  badge: New
---

## Information

Dynamic forms often need repeating groups, like adding multiple contacts or social links. Angular Reactive Forms provides `FormArray` to manage these collections while keeping validation and structure predictable.

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
- **Network links** (FormArray)
  - Network name (required)
  - Handle (required)

Current behavior:

- Users can add or remove contacts and network links.
- Submit is disabled until the form is valid.
- Validation errors appear when fields are touched/dirty or after submitting.
- Submitted data is displayed as JSON after a successful submission.

### Challenge Goal

Refactor the form to **Signal-based forms** while preserving the UI, validations, and dynamic FormArray behavior.

### Expected Result

After completing the challenge, your form should:

- Use Signal-based forms instead of `FormGroup`, `FormControl`, and `FormArray`.
- Keep the same validation rules for all fields.
- Preserve add/remove behavior for contacts and network links.
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
