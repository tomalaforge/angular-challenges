---
title: 🟢 Pure Pipe
description: Challenge 8 is about creating a pure pipe
author: thomas-laforge
challengeNumber: 8
command: angular-pipe-easy
blogLink: https://medium.com/ngconf/deep-dive-into-angular-pipes-c040588cd15d
sidebar:
  order: 3
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

The goal of this series of 3 pipe challenges is to master PIPES in Angular.

Pure pipes are a very useful way to transform data from your template. The difference between calling a function and a pipe is that pure pipes are memoized. So they won't be recalculated every change detection cycle if their inputs haven't changed.

## Information:

In this first exercice, you call a simple function inside your template. The goal is to convert it to a pipe.

## Constraints:

- must be strongly typed
