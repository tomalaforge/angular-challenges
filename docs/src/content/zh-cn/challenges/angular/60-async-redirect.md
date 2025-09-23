---
title: 🟢 async-redirect
description: 挑战 60 旨在使用 Angular Router 的新 `redirectTo` 方法来现代化导航逻辑。
author: thomas laforge
contributors:
  - tomalaforge
challengeNumber: 60
command: angular-async-redirect
sidebar:
  order: 23
  badge: New
---

## 说明

在本挑战中，你将处理一个 Angular 应用，该应用当前在 `dashboard.ts` 中使用自定义的 `navigate` 方法来处理路由跳转。随着 Angular Router v20 引入了新的 `redirectTo` 方法，目标是通过删除旧的 `navigate` 方法并重构应用，使其在所有需要跳转的地方都使用 `redirectTo`，从而实现代码现代化。

你的任务是：

- 找到并删除 `dashboard.ts` 文件中的 `navigate` 方法；
- 在需要导航的地方，重构应用以使用 Angular Router 的新 `redirectTo` 方法。

这样可以确保应用充分利用 Angular 路由的最新特性，并保持导航和重定向的最佳实践。
