---
title: 🟠 Save your form&#39;s bacon: with the navigation alert
description: Challenge 48 is about Bob 🧙‍♂️ the product owner, he wants to develop a new feature in response to customer complaints about losing form input information.
author: Timothy Alcaide
contributors:
  - tomalaforge
challengeNumber: 48
command: angular-dialog-alert-form
sidebar:
  order: 121
  badge: New
---

:::note
WIP: The following documentation need to be written.
:::

## Context

As a member of the development team, you need to address a specific request from the product owner, Bob 🧙‍♂️ He wants to develop a new feature in response to customer complaints about losing form input information.

## User Story

Here's the feature expressed as a user story (functional expectation)

"As a user, I would like to have an alert dialog box that appears when I attempt to navigate away from the /form page after I have started entering information into the form."

## Acceptance Criteria

1. On the /form page:

- If the input text has been pre-filled, then an alert dialog box opens.
- Otherwise, the user navigates normally.

2. The alert dialog box must be clear and concise, stating: "Caution! You have unsaved information. Do you want to continue and lose them?" with the following button labels:

- Continue without saving
- Stay on page

3. The appearance and behavior of the alert dialog box must comply with W3C conventions, see [alert dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/)
4. Maximize the use of the new concepts and syntax in the latest version of Angular.
5. (Bonus) : Try to adopt a declarative approach (for dialog opening, for example).

<details>
    <summary>Tips 🤫 (if you really need it and after careful consideration)</summary>
    Use the Material CDK Dialog - https://material.angular.io/cdk/dialog/overview
    Use the CanDeactivate guard - https://angular.io/api/router/CanDeactivate (use new functionnal approach).
</details>
