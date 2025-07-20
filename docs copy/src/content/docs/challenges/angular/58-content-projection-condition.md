---
title: 🟠 Content Projection Condition
description: Challenge 58 is about conditional content projection in Angular
author: thomas-laforge
contributors:
  - tomalaforge
challengeNumber: 58
command: angular-content-projection-condition
sidebar:
  order: 124
---

## Information

Content projection in Angular allows you to create flexible and reusable components by dynamically inserting content from a parent component using `<ng-content>`. However, debugging content projection issues can sometimes be tricky.

In this challenge, we have a `CardComponent` that supports a small mode, which conditionally changes how the projected content is displayed. However, there is a bug: when `small` is `false`, the card does not render properly.

Your task is to identify and fix this issue without adding `inputs` while ensuring that the intended behavior remains unchanged.

## Statement

Your goal is to fix the issue where the `CardComponent` does not render when `small` is `false`.

## Steps to complete:

- Analyze how the `small` property is used inside the template.
- Identify why the content is not displayed when `small` is `false`.
- Modify the component to ensure that both cases (`small` = `true` and `small` = `false`) work as expected, while keeping the same structure and behavior.
- Ensure that no new `input` properties are introduced in the component.

## Constraints

- You must not add any new `input` properties.
- The expected UI and behavior must remain unchanged.
- The `@if` directive must be correctly handled to ensure content projection works.
- Do not introduce additional services or state management solutions.
- The fix should be minimal and focused on resolving the rendering issue.
