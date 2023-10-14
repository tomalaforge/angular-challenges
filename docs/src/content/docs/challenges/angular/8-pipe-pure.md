---
title: 🟢 Pure Pipe
description: Challenge 8 is about creating a pure pipe
author: Thomas Laforge
challengeNumber: 8
command: pipe-easy
blogLink: https://medium.com/ngconf/deep-dive-into-angular-pipes-c040588cd15d
sidebar:
  order: 3
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

The goal of this serie of 3 pipe challenges is to master PIPES in Angular.

Pure pipe are a very useful way to transform data from your template. The difference between calling a function and a pipe is that pure pire are memoized. So they won't be recalculated every change detection cycle if the inputs hasn't changed.

## Information:

In this first exercice, you add calling a simple function inside your template. The goal is to convert it to a pipe.

## Constraints:

- must be strongly typed
