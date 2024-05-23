---
title: 🔴 Typed ContextOutlet
description: Challenge 4 is about strongly typing ngContextOutlet directives
author: thomas-laforge
contributors:
  - tomalaforge
  - tomer953
  - svenson95
  - jdegand
  - LMFinney
challengeNumber: 4
command: angular-typed-context-outlet
blogLink: https://medium.com/@thomas.laforge/ngtemplateoutlet-type-checking-5d2dcb07a2c6
sidebar:
  order: 201
---

## Information

You can improve template type checking for custom directives by adding template guard properties to your directive definition. Angular offers the static function [`ngTemplateContextGuard`](https://angular.dev/guide/directives/structural-directives#improving-template-type-checking-for-custom-directives) to strongly type structural directives.

However, the context of **NgTemplateOutlet** type is **Object**. But with the help of the above guard, we can improve that behavior.

## Statement

In this exercise, we want to learn how to strongly type our `ng-template` in our `AppComponent`.

This exercise has two levels of complexity.

### Level 1: Known Interface

Currently, we have the following piece of code.

![Unknown Person](../../../../assets/4/unknown-person.png 'Unknown Person')

As we can see, `name` is of type `any`. We want to infer the correct type using the custom directive `PersonDirective`.

### Level 2: Generic Interface

Currently, we have the following piece of code.

![Unknown Student](../../../../assets/4/unknown-student.png 'Unknown Student')

As we can see, `student` is of type `any`. We want to infer the correct type using the custom directive `ListDirective`.

But in this part, we want to pass a list of **any object** to `ListComponent`. And we still want the correct type to be inferred.
