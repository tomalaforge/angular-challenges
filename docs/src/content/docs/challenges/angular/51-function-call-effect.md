---
title: 🟢 Function call in effect
description: Challenge 51 is about understanding why an effect is triggered too often.
author: thomas-laforge
contributors:
  - tomalaforge
challengeNumber: 51
command: angular-function-call-effect
sidebar:
  order: 20
  badge: New
---

## Information

In this second challenge on Signal effect, we have an input select to choose what action a user will perform. When we select an action, we log the action in the console.
We can also change the selected user.

## Statement

We should log an action only when we select an action. However we log also when we change the user despite the fact that we don't listen to user changes.

The objective of this challenge is to understand and correct the issue of too many triggers. We should log only on action changes.
