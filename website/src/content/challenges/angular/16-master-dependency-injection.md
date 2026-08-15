---
title: 🔴 Master Dependency Injection
description: Challenge 16 is about mastering how dependancy injection works
author: thomas-laforge
contributors:
  - tomalaforge
  - tomer953
  - kabrunko-dev
challengeNumber: 16
command: angular-master-dependency-injection
sidebar:
  order: 203
---

## Information

To successfully complete this challenge, you will need to have a good understanding of how [Dependency Injection](https://angular.dev/guide/di/dependency-injection) works inside Angular.

The goal is to provide the `CurrencyService` at the row level, so that each row displays the correct currency. Currently, the `CurrencyService` is only provided at the table level, which results in an error as the same currency is displayed for each row, despite each product having a different currency.

One way to achieve this is by adding a second argument to the pipe, but this is not allowed for this challenge.

## Statement

- Your task is to display the correct currency for each row.

## Constraints

- You cannot modify the pipe.
- You cannot wrap the row inside a component, as this will break the layout.
