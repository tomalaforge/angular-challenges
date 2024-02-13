---
title: 🟠 Optimize Change Detection
description: Challenge 12 about optimizing the number of change detection cycle while scrolling
author: thomas-laforge
challengeNumber: 12
command: performance-scroll-cd
sidebar:
  order: 107
---

## Information

In Angular, there is a library called <b>Zone.js</b> that performs a lot of magic to simplify a developer's life. Zone.js monkey patches all DOM events so that it will recheck and rerender the view when something has changed inside the application. The developer doesn't have to manually trigger change detection.

However, sometimes Zone.js triggers a lot more change detection than needed. For example, when you are listening to a scroll event, each scroll event will dispatch a new change detection cycle.

In this challenge, we only need to refresh the view at a specific scroll position to display or hide a button. All other cycles are unnecessary.

To have a better visualization of the problem, profile your application with Angular Dev Tools.

:::note
If you don't know how to use it, read [the performance introduction page](/challenges/performance/) first and come back after.
:::

You can learn more details about zone pollution and how to resolve it [here](https://angular.io/guide/change-detection-zone-pollution).

The following video will explain more in-depth the issue of this application.

<video controls src="https://user-images.githubusercontent.com/30832608/209819211-58d9ddcf-e1ad-4a78-8a7a-2be9d729e3f1.mov">
</video>

## Statement

Your goal for this challenge is to avoid all unnecessary change detection cycles and trigger a change detection only when needed.

## Constraint:

You cannot opt-out of Zone.js globally. If this code is part of a large project and you opt out of Zone.js, you will break your application without any doubt.
