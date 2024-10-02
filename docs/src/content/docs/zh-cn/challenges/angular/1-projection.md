---
title: 🟢 投影
description: 挑战1是学习如何通过组件投影DOM元素
author: thomas-laforge
contributors:
  - tomalaforge
  - jdegand
  - dmmishchenko
  - kabrunko-dev
  - svenson95
challengeNumber: 1
command: angular-projection
blogLink: https://medium.com/@thomas.laforge/create-a-highly-customizable-component-cc3a9805e4c5
videoLinks:
  - link: https://www.youtube.com/watch?v=npyEyUZxoIw&ab_channel=ArthurLannelucq
    alt: Projection video by Arthur Lannelucq
    flag: FR
  - link: https://www.youtube.com/watch?v=yNrfvu7vTa4
    alt: Projection video by Amos Lucian Isaila
    flag: ES
sidebar:
  order: 1
---

## 信息

在Angular中，内容投影是一种创建高度可定制组件的强大技术。利用和理解<b>ng-content</b>和<b>ngTemplateOutlet</b>的概念可以显著增强你创建可共享组件的能力

你可以在[这里](https://angular.dev/guide/components/content-projection)了解<b>ng-content</b> 的所有内容，从简单的投影到更复杂的投影。

要了解<b>ngTemplateOutlet</b>，你可以在[这里](https://angular.io/api/common/NgTemplateOutlet)找到API文档和一些基本示例。

有了这两个工具，您现在就可以接受挑战了。

## 说明

您将从一个功能齐全的应用程序开始，该应用程序包括一个包含教师卡和学生卡的仪表盘。目标是实现城市卡。

虽然应用程序可以工作，但开发人员的体验还远没有达到最佳。每次需要实现新卡时，都必须修改`card.component.ts` 。在实际项目中，该组件可以在许多应用程序之间共享。该挑战的目标是创建一个 `CardComponent` ，它可以在不做任何修改的情况下进行自定义。一旦你创建了这个组件，你就可以开始实现 `CityCardComponent` ，并确保你没有触碰 `CardComponent` 。

## 约束

- <b>必须</b>重构 `CardComponent` 和 `ListItemComponent`。
- `NgFor` 指令必须声明并保持在 `CardComponent` 内。你可能想把它移到 `ParentCardComponent` ，比如 `TeacherCardComponent` 。
- `CardComponent` 不应包含任何 `NgIf` 或 `NgSwitch` 。
- CSS:尽量避免使用 `::ng-deep` 。寻找更好的方法来处理CSS样式。

## 挑战奖励

- 尝试使用新的内置控制流语法for循环和条件语句(文档在[这里](https://angular.dev/guide/templates/control-flow))
- 使用signal API来管理组件状态(文档在[这里](https://angular.dev/guide/signals))
- 要引用模板，请使用指令而不是魔术字符串([魔术字符串有什么问题?](https://softwareengineering.stackexchange.com/a/365344))
