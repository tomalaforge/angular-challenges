---
title: 🟠 Optimize Big List
description: Challenge 37 is about learning how virtualization optimize big list rendering
author: thomas-laforge
challengeNumber: 37
command: performance-ngfor-biglist
sidebar:
  order: 117
---

## Information

In this application, we will render a list of 100,000 individuals by clicking on the **loadList** button. If you open the Chrome developer panel by pressing **F12**, go to the <b>Source</b> tab, and expand the element to see the list, you will notice that all 100,000 elements are rendered in the DOM, even though we can only see about 20 elements in the viewport. This process takes a lot of time, which is why the application is very slow at displaying the list.

We can use the <b>Angular DevTool</b> to profile our application and understand what is happening inside our application. I will show you how to do it inside the following video.

<video controls src="https://github.com/tomalaforge/angular-challenges/assets/30832608/713403fa-2eda-49d5-a7c9-acdef8aacd34">
</video>

:::note
If you don't know how to use it, read [the performance introduction page](/challenges/performance/) first and come back after.
:::

## Statement

The goal of this challenge is to implement a better alternative to display big list of items.

## Hints:

<details>
  <summary>Hint 1</summary>

If you're unsure where to begin, I recommend reading the [Angular CDK virtualization documentation](https://material.angular.io/cdk/scrolling/overview).

</details>
