---
title: 🟢 Projection
description: Challenge 1 is about learning how to project DOM element through components
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

## Information

In Angular, content projection is a powerful technique for creating highly customizable components. Utilizing and understanding the concepts of <b>ng-content</b> and <b>ngTemplateOutlet</b> can significantly enhance your ability to create shareable components.

You can learn all about <b>ng-content</b> [here](https://angular.dev/guide/components/content-projection) from simple projection to more complex ones.

To learn about <b>ngTemplateOutlet</b>, you can find the API documentation [here](https://angular.dev/api/common/NgTemplateOutlet) along with some basic examples.

With these two tools in hand, you are now ready to take on the challenge.

## Statement

You will start with a fully functional application that includes a dashboard containing a teacher card and a student card. The goal is to implement the city card.

While the application works, the developer experience is far from being optimal. Every time you need to implement a new card, you have to modify the `card.component.ts`. In real-life projects, this component can be shared among many applications. The goal of the challenge is to create a `CardComponent` that can be customized without any modifications. Once you've created this component, you can begin implementing the `CityCardComponent` and ensure you are not touching the `CardComponent`.

## Constraints

- You <b>must</b> refactor the `CardComponent` and `ListItemComponent`.
- The `@for` must be declared and remain inside the `CardComponent`. You might be tempted to move it to the `ParentCardComponent` like `TeacherCardComponent`.
- `CardComponent` should not contain any conditions.
- CSS: try to avoid using `::ng-deep`. Find a better way to handle CSS styling.

## Bonus Challenges

- Use the signal API to manage your components state (documentation [here](https://angular.dev/guide/signals))
- To reference the template, use a directive instead of magic strings ([What is wrong with magic strings?](https://softwareengineering.stackexchange.com/a/365344))
