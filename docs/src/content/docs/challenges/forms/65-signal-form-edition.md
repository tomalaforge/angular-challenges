---
title: 🟠 signal-form-edition
description: Challenge 65 is about ...
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

Angular has introduced a new way to work with forms using Signals. This modern approach provides better type safety, reactivity, and a more intuitive API compared to traditional Reactive Forms.

In this challenge, you will maintain a user management application. The current implementation uses Reactive Forms (`FormControl`, `FormGroup`). Your goal is to migrate it to the new Signal-based Forms API.

## Statement

The application allows listing, adding, and editing users. It includes:

- **User List**: Displays all users with "Edit" and "Delete" actions.
- **User Form**: A form used for both adding and editing users.
- **Fake Backend**: Simulates HTTP calls with a 500ms delay.

Your goal is to **refactor the `UserFormComponent` to use Angular's new Signal-based Forms API** while maintaining exactly the same functionality and validation rules.

### Current Implementation

The form currently uses:

- `FormGroup` and `FormControl` for the user fields.
- `Validators` for mandatory fields (`firstname`, `lastname`, `age`) and minimum age.
- `patchValue` and `reset` for managing form state during edition.

### Expected Result

After completing the challenge, your application should:

- Use Signal-based form instead of `FormControl` and `FormGroup` in `UserFormComponent`.
- Maintain all existing validation rules and error messages.
- Correctly handle the transition between "Add" and "Edit" modes.
- Keep the 500ms delay simulation working via the service.
- Maintain the same UI and user experience.

## Constraints

- Do not modify the `FakeBackendService` or `User` model.
- You can refactor `AppComponent` and `UserListComponent` if necessary to better support signals, but the primary focus is the form.
- The form must properly validate inputs before submission.
