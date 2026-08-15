---
title: 🟠 Wrap Function Pipe
description: Challenge 9 is about creating a pipe to wrap component fonctions
author: thomas-laforge
contributors:
  - tomalaforge
  - tomer953
  - kabrunko-dev
  - svenson95
  - LMFinney
challengeNumber: 9
command: angular-wrap-function-pipe
blogLink: https://medium.com/ngconf/boost-your-apps-performance-by-wrapping-your-functions-inside-a-pipe-7e889a901d1d
sidebar:
  order: 103
---

## Information

This is the second of three `@Pipe()` challenges. The goal of this series is to master **pipes** in Angular.

Pipes are a very powerful way to transform data in your template. The difference between calling a function and a pipe is that pure pipes are memoized. So, they won't be recalculated every change detection cycle if their inputs haven't changed.

Pipes are designed to be efficient and optimized for performance. They use change detection mechanisms to only recalculate the value if the input changes, to minimize unnecessary calculations and improve rendering performance.

By default, a pipe is pure. You should be aware that setting `pure` to false is prone to be inefficient, because it increases the amount of rerenders.

:::note
A **pure** pipe is only called when the value changes.\
A **impure** pipe is called every change detection cycle.
:::

There are some useful predefined pipes like the DatePipe, UpperCasePipe and CurrencyPipe. To learn more about pipes in Angular, check the API documentation [here](https://angular.dev/guide/pipes).

## Statement

In this exercise, you are calling multiple functions inside your template. You can create a specific pipe for each of the functions, but this will be too cumbersome.
The goal is to create a `wrapFn` pipe to wrap your callback function through a pipe. Your function MUST remain inside your component. **`WrapFn` must be highly reusable.**

## Constraints

- Must be strongly typed
