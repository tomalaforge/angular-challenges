---
title: 🔴 forms and signal
description: Challenge 56 is about working with reactive forms and signals
author: thomas-laforge
contributors:
  - tomalaforge
challengeNumber: 56
command: signal-forms-and-signal
sidebar:
  order: 211
---

## Information

We are working within a large e-commerce codebase that utilizes a substantial number of forms. The team predominantly uses reactive forms, and since the release of signals, we have been integrating them extensively.

The current feature in development is a multi-step form process. The steps include: selecting a product, choosing the quantity, and finally proceeding to the checkout step to complete the billing details. However, an issue has been identified: when a user navigates back from the checkout step to the quantity step, the previously selected quantity is not retained. This needs to be fixed.

## Challenge Statement

The objective of this challenge is to make sure that the selected quantity is preserved when navigating back from the checkout step to the quantity step.

## Constraints

The solution must use reactive forms and signals.

Additionally, as an optional side challenge, you may refactor the code to use template-driven forms.
