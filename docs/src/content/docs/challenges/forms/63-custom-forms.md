---
title: 🟠 Custom Forms
description: Refactor the checkout form to Signal-based forms with reusable address component and shared validators
author: thomas-laforge
contributors:
  - tomalaforge
challengeNumber: 63
command: forms-custom-forms
sidebar:
  order: 125
  badge: New
---

## Information

You already built a checkout form with Reactive Forms (FormGroup / FormControl). Now you will refactor it to **Signal-based forms** while keeping the UX, validations, and billing toggle behavior.

You can learn more about Signal-based forms in the [Angular documentation](https://angular.dev/guide/forms/signals-based-forms).

## Statement

The application contains a single-page checkout form with the following fields:

- **Last name** (required)
- **First name** (required)
- **Shipping address**: street, ZIP code, city (all required)
- **Billing address**: street, ZIP code, city (all required when visible)
- **Billing address same as shipping** toggle

Current behavior:

- When the toggle is on, billing is hidden and disabled.
- When toggling on, the billing form copies the current shipping values.
- Submit marks all controls touched and prevents submission when invalid.
- Error hints show when a control is invalid and touched/dirty.

### Goal

Refactor the form to **Signal-based forms** and extract reusable pieces:

1. Migrate all controls to Signal-based forms, preserving validation and submit behavior.
2. Create a reusable **AddressFormComponent** for street/ZIP/city.
3. Define a shared **custom validator schema** for the address group and reuse it for shipping and billing.
4. Keep the toggle behavior (copy shipping to billing, disable billing when same-as-shipping is true).
5. Preserve the UI and Tailwind styling.

## Constraints

- Use Signal-based forms only (no `FormGroup` / `FormControl`).
- Keep the same validations (all fields required, billing required when visible).
- Use a shared address validator schema applied to both shipping and billing subforms.
- Move address fields into a standalone `AddressFormComponent`
- Maintain the preview and status text.
- All existing tests must pass.

:::tip[TDD Approach]
You can run tests in watch mode to refactor using Test-Driven Development (TDD):

```bash
nx test forms-custom-form
```

This will re-run tests automatically as you make changes, helping you ensure all functionality works correctly during your migration.
:::
