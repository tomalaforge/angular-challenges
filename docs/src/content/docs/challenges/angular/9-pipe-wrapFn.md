---
title: 🟠 Wrap Function Pipe
description: Challenge 9 is about creating a pipe to wrap component fonctions
author: thomas-laforge
challengeNumber: 9
command: angular-pipe-intermediate
blogLink: https://medium.com/ngconf/boost-your-apps-performance-by-wrapping-your-functions-inside-a-pipe-7e889a901d1d
sidebar:
  order: 103
---

The goal of this series of 3 pipe challenges is to master **pipe** in Angular.

Pure pipes are a very useful way to transform data from your template. The difference between calling a function and a pipe is that pure pipes are memoized. So they won't be recalculated every change detection cycle if their inputs haven't changed.

## Information:

In this second exercice, you are calling multiple functions inside your template. You can create a specific pipe for each of the functions but this will be too cumbersome.
The goal is to create a `wrapFn` pipe to wrap your callback function though a pipe. Your function MUST remain inside your component. **`WrapFn` must be highly reusable.**

## Constraints:

- must be strongly typed
