---
title: 🟢 Bug in Effect ?
description: Challenge 50 is about understanding why an effect is not triggered.
author: thomas-laforge
contributors:
  - tomalaforge
  - svenson95
challengeNumber: 50
command: angular-bug-effect-signal
sidebar:
  order: 19
  badge: New
---

## Information

In this basic exercise, we aim to display an alert whenever at least one checkbox is checked. In this app you are in the process of buying a MacBook, which can be upgraded with some extras, like more drive space, more RAM or a better GPU.

## Statement

The actual implementation doesn't work as expected, your task is to fix the issue. Your team exposed a bug, there is a alert to be shown if atleast one of the three checkboxes is checked. But if the first one is checked, the other two checkboxes gets checked without displaying the alert. Why does this happen?

The objective of this challenge is to understand the issue and fix the problem, preventing the alert from appearing when the second checkbox is clicked.

## Acceptance Criteria

To ensure this feature works properly, fix the bug and try this out to reproduce the bug, if it's still there.

- Check box 1 (Alert should be shown)
- Check box 2 (Alert should be shown)
- Uncheck box 1
- Check box 3 (Alert should be shown)
- Uncheck box 2
- Uncheck box 3

## Bonus Challenge

- Try to implement this feature with a `computed` signal `isPriceIncreased`, use this signal in a `effect` to determine, if the alert should be shown or not.
