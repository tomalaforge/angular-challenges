---
title: 🟢 Memoization
description: Challenge 35 is about learning how pure pipe works
author: thomas-laforge
challengeNumber: 35
command: performance-memoized
sidebar:
  order: 8
---

<div class="chip">Challenge #35</div>

## Information

In Angular, <b>pure Pipes</b> are very powerful because the value is memoized, which means if the input value doesn't change, the `transform` function of the pipe is not recomputed, and the cached value is outputted.

You can learn more about pipes in the [Angular documentation](https://angular.io/guide/pipes) and inside this [deep dive article](https://medium.com/ngconf/deep-dive-into-angular-pipes-c040588cd15d).

In this challenge, we start with a button to load a list of people. Each person is associated with a number, and we will use the Fibonacci calculation to create a heavy computation that will slow down the application.

Once the list is loaded, try typing some letters inside the input field. You will notice that the application is very slow, even though you are only performing very basic typing.

:::note
We will not focus on the initial loading of the list in this challenge.
:::

Let's use the <b>Angular DevTool</b> to profile our application and understand how this tool can help us understand what is happening inside our application.

:::note
If you don't know how to use it, read [the performance introduction page](/challenges/performance/) first and come back after.
:::

Now, start profiling your application and type some letters inside the input field. You will see some red bars showing up inside the profiler panel.

If you click on one of the bars (indicated by the yellow arrow in the picture below), you will see that the change detection cycle is taking more than 3s in `PersonListComponent`.

![profiler record](../../../../assets/performance/35/memoize-profiler.png 'Profiler Record')

## Statement

The goal of this challenge is to understand what is causing this latency and to improve it.

## Hints:

<details>
  <summary>Hint 1</summary>

Use `Pipes` to memoize the Fibonnaci computation.

</details>
