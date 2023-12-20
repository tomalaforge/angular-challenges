---
title: 🟠 Web workers
description: Challenge 40 is about learning how to create and use a web worker
author: thomas-laforge
challengeNumber: 40
command: performance-christmas-web-worker
sidebar:
  order: 119
---

## Information

This challenge has been created for [Angular Advent Calendar](https://angularchristmascalendar.com) 2023.

This application is basic. We click on the **Discover** button to reveal the surprise hidden behind the black screen. However, the current application provides an awful user experience. When we click on the button, the page freezes, and after a while, it reveals the secret all at once without a smooth animation.

> Note: To create the application freeze, the loader is based on a very heavy computation function. We could have used a basic timer, but that's not the point of this challenge.

Since JavaScript is single-threaded, when we perform a heavy task, the browser cannot update the UI or respond to mouse clicks or any events. To free the main thread, the goal is to isolate the heavy computation into a different thread. To do so, we will need to use web workers. Web workers can run any scripts in the background, in isolation from the main thread, allowing the browser to still provide your user with a good experience.

In Angular, this technology is often underused, however, it's straightforward to create one. There is a schematic that you can find [here](https://angular.io/guide/web-worker).

## Statement

The goal of this challenge is to create a smooth animation by isolating the heavy computation function into a web worker.

First, create a web worker using a schematic, then move the issuing function. Finally, the animation should be smooth and the progress percentage should update, which will provide an awesome user experience.

:::note
Since we are inside an Nx workspace, simply replace the `ng` command with `nx` when running the schematic.

If `nx` is not installed globally on your machine, prefix your command with `npx`.
:::
