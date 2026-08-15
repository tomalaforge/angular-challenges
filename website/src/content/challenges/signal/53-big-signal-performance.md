---
title: 🟠 Big Signal Performance
description: Challenge 53 is about performance while using big signal object
author: thomas-laforge
contributors:
  - tomalaforge
  - jdegand
challengeNumber: 53
command: signal-big-signal-performance
sidebar:
  order: 122
---

## Information

For this challenge, you can imagine a large-scale application where you use a service to save and retrieve your user state at any time within the application.

The problem is that updating a single user property updates the entire application.

I added the `CDFlashingDirective` to visualize when one component is rendering.

## Statement

With signals, you can now be more fine-grained in what the UI is rendering. The goal of this challenge is to understand why everything is re-rendering and to refactor the application to be more performant.
