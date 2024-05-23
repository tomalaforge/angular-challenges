---
title: 🟢 Bug in Effect
description: Challenge 50 is about understanding why an effect is not triggered.
author: thomas-laforge
contributors:
  - tomalaforge
  - svenson95
  - LMFinney
challengeNumber: 50
command: signal-bug-in-effect
sidebar:
  order: 19
---

## Information

In this basic exercise, we aim to display an alert whenever at least one checkbox is checked. You are in the process of buying a MacBook, which can be upgraded with some extras, like more drive space, more RAM or a better GPU.

<img width="889" alt="Bildschirmfoto 2024-05-09 um 08 57 57" src="https://github.com/svenson95/angular-challenges/assets/46655156/d78f42a5-9064-4a33-bb8c-c0433bd6966d">

## Statement

The actual implementation doesn't work as expected, and your task is to fix a bug that your team discovered. An alert should be shown if at least one of the three checkboxes is checked (independent of any other checkboxes). But if the first one is checked, checking one or both of the other two checkboxes does not cause the alert to display. Why does this happen?

The objective of this challenge is to understand the issue and fix the problem that prevents the alert from appearing when the second checkbox is clicked.

## Acceptance Criteria

To ensure this feature works properly, try this out to reproduce the bug after solving the challenge, to check if the bug is gone.

- Check box 1 (Alert should be shown)
- Check box 2 (Alert should be shown)
- Uncheck box 1
- Check box 3 (Alert should be shown)
- Uncheck box 2
- Uncheck box 3

## Bonus Challenge

- Try to implement this feature with a `computed` signal.
