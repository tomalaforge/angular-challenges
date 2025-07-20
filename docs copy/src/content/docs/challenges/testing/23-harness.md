---
title: 🟢 Harness
description: Challenge 23 is about testing with component harnesses
author: thomas-laforge
contributors:
  - tomalaforge
  - tomer953
  - svenson95
  - jdegand
  - LMFinney
challengeNumber: 23
command: testing-harness
sidebar:
  order: 9
---

## Information

A component harness is a class that lets a test interact with a component via a supported API.

The objective of this challenge is to have a better understanding of the CDK test harness API. In this initial challenge, we will only use Angular Material's built-in harnesses.

Documentation for CDK Component Harness is [here](https://material.angular.io/cdk/test-harnesses/overview#api-for-test-authors).
Documentation for Angular Material component is [here](https://material.angular.io/components/button/overview).

## Statement

Test the functionality of `child.component.ts`, which consists of some inputs & checkboxes related to a `mat-slider`. Implement the prepared test suite, but feel free to include additional tests as well.

**Note:** You are welcome to use [Angular Testing Library](https://testing-library.com/) if you wish.
