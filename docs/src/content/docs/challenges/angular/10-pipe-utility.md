---
title: 🔴 Utility Wrapper Pipe
description: Challenge 10 is about creating a pipe to wrap utilities
author: thomas-laforge
challengeNumber: 10
command: angular-pipe-hard
sidebar:
  order: 202
---

The goal of this series of 3 pipe challenges is to master **pipe** in Angular.

Pure pipes are a very useful way to transform data from your template. The difference between calling a function and a pipe is that pure pipes are memoized. So they won't be recalculated every change detection cycle if their inputs haven't changed.

## Information:

In this third exercice, you want to access utils functions. Currently you cannot access them directly from your template. The goal is to create a specific pipe for this utils file where you will need to pass the name of the function you want to call and the needed arguments.

## Constraints:

- must be strongly typed
