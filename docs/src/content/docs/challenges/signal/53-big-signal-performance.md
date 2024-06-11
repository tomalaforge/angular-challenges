---
title: 🟠 Big Signal Performance
description: Challenge 53 is about performance while using big signal object
author: thomas-laforge
contributors:
  - tomalaforge
challengeNumber: 53
command: signal-big-signal-performance
sidebar:
  order: 122
  badge: New
---

## Information

In this challenge, you can imagine a big application where you store your user state inside a service and you use this service to use your user anywhere in your application.
The issue is when you update one property of your user, the entire application is updating.

I added the `CDFlashingDirective` to vizualise when one component is rerendering.

## Statement

With Signal, you can now be more fine-grained in what the UI is rerendering. The goal of this challenge is to understand why everything is rerendering and you refactor the application to be more performante.
