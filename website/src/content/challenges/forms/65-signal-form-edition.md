---
title: 🟠 signal-form-edition
description: Refactor a user management form to use Angular's new Signal-based Forms API.
author: thomas-laforge
contributors:
  - tomalaforge
challengeNumber: 65
command: forms-signal-form-edition
sidebar:
  order: 127
  badge: New
---

## Information

Angular has introduced a new way to work with forms using Signals. This modern approach provides better reactivity and a more intuitive API compared to traditional Reactive Forms.

In this challenge, you will refactor a user management application. The current implementation uses traditional Reactive Forms. Your goal is to migrate it to the new Signal-based Forms API.

## Statement

The application allows listing, adding, and editing users. It includes:

- **User List**: Displays all users with "Edit" and "Delete" actions.
- **User Form**: A form used for both adding and editing users.
- **Fake Backend**: Simulates HTTP calls with a 500ms delay.

Your goal is to **refactor the `UserFormComponent` to use Angular's Signal-based Forms API** while maintaining exactly the same functionality and validation rules.

### Current Implementation

The form currently uses:

- `FormGroup` and `FormControl` for the user fields.
- `Validators` for mandatory fields (`firstname`, `lastname`, `age`) and minimum age.
- `patchValue` and `reset` for managing form state during edition.

The application also uses `rxResource` to load users and navigation to handle the editing context.

### Expected Result

After completing the challenge:

- Use Signal-based form instead of `FormControl` and `FormGroup` in `UserFormComponent`.
- Maintain all existing validation rules and error messages.
- Correctly handle the transition between "Add" and "Edit" modes.
- Maintain the same UI and user experience.

## Testing

A comprehensive test suite is provided to ensure your refactoring doesn't break any functionality. You can run the tests using:

```bash
npx nx test forms-signal-form-edition
```

These tests verify the entire user management flow, including adding, editing, and deleting users, as well as form validation.

## Constraints

- Do not modify the `FakeBackendService` or `User` model.
- You can refactor other components if necessary, but the primary focus is the `UserFormComponent`.
- The form must properly validate inputs before submission.
