---
title: 🟢 Default vs OnPush
description: Challenge 34 is about learning the difference between Default and OnPush Change Detection Strategy.
author: thomas-laforge
challengeNumber: 34
command: performance-default-onpush
sidebar:
  order: 7
---

## Information

In this challenge, we will explore the differences and impacts of using `ChangeDetectionStrategy.Default` versus `ChangeDetectionStrategy.OnPush`.

You can read the [Angular documentation](https://angular.io/guide/change-detection-skipping-subtrees) to learn more about the differences between these strategies.

In this challenge, all components start with the `Default` strategy. When you type letters inside the input field, you will notice that all components are highlighted in orange.

:::note
I added color highlighting to each component and each row to provide a better visualization of when a component is rerendered.
:::

As you can see, each letter triggers a new change detection cycle, and all components are rerendered, causing performance issues.

Let's use the <b>Angular DevTool</b> to profile our application and understand how this tool can help us understand what is happening inside our application.

:::note
If you don't know how to use it, read [the performance introduction page](/challenges/performance/) first and come back after.
:::

Now, start profiling your application and type some letters inside the input field to trigger some change detection cycles.

If you click on one of the bars (indicated by the yellow arrow in the picture below), you can see that `PersonListComponent`, `RandomComponent`, and all the `MatListItem` are impacted by the change detection cycle, even when we only interact with the input field.

![profiler record](../../../../assets/performance/34/profiler-record.png 'Profiler Record')

## Statement

The goal of this challenge is to improve the clustering of change detection within the application using the `OnPush` change detection strategy, but not only...

## Hints:

<details>
  <summary>Hint 1</summary>

Use `ChangeDetectionStrategy.OnPush` but this will not be enough.

</details>

<details>
  <summary>Hint 2</summary>

Create smaller components to better separate the input field from the list.

</details>
