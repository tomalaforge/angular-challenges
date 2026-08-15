---
title: 🟢 Function call in effect
description: Challenge 51 is about understanding why an effect is triggered too often.
author: thomas-laforge
contributors:
  - tomalaforge
challengeNumber: 51
command: signal-function-call-effect
sidebar:
  order: 20
---

## Information

In this second challenge focusing on Signal effects, we've introduced an input select that allows users to choose an action. Whenever an action is selected, it is logged in the console. The application also permits changes to the selected user.

## Problem Statement

Ideally, the system should log an action only when one is specifically selected. However, we currently face an issue where changing the user also triggers a log entry, even though we do not explicitly monitor user changes.

The objective of this challenge is to identify and resolve the cause of these extra triggers. We aim to ensure that logging only occurs when an action is selected.

## Constraints

- You cannot modify the `UserService` file.
