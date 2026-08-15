---
title: 🟢 Module to Standalone
description: Challenge 31 is about migrating a module based application to a standalone application.
author: thomas-laforge
contributors:
  - tomalaforge
challengeNumber: 31
command: angular-module-to-standalone
sidebar:
  order: 6
---

## Information

In v14, standalone components were released and made stable in v15. If you haven't played with them, it's never too late. You can try them out in this challenge.

Moreover, the goal is to see how **Nx** and **standalone components** work together, and experience the process of decoupling your app with Nx lib and standalone components.

Finally, standalone components are very simple to understand, but **routing/lazy-loaded components** can be a bit harder to grasp. This challenge will allow you to manipulate components at different levels of nesting and work with lazy loaded routes.

After completing this challenge, standalone components will no longer hold any secrets for you.

## Statement

The goal of this challenge is to migrate your application from module based components to standalone components.

## Note

You can also test the [Angular schematic](https://angular.dev/reference/migrations/standalone) to migrate NgModule to Standalone components. _(Since we are using nx, start your command with nx instead of ng)_
