---
title: 🟢 Content Projection Default
description: Challenge 57 is about content projection default container
author: thomas-laforge
contributors:
  - tomalaforge
challengeNumber: 57
command: angular-content-projection-default
sidebar:
  order: 22
---

## Information

Content projection in Angular allows developers to create flexible and customizable components by passing content from the parent component to the child component dynamically using `<ng-content>`.

Currently, we have a shared component that relies on `input` properties to receive and display data. However, we want to improve its flexibility by replacing all `inputs` with content projection while maintaining the same appearance and behavior.

## Statement

Your task is to refactor the existing shared component to remove all `input` properties and instead use Angular’s `<ng-content>` for content projection. After your modifications, the application should look and function exactly as before, but without any `input`.

### Steps to complete:

- Identify all `input` properties in the shared component.
- Remove them and replace them with appropriate `<ng-content>` containers.
- Adjust the parent component to pass the necessary content using content projection instead of binding to `input`s.
- Ensure that the application still displays the same UI and behavior after the changes.

## Constraints

- You must not use any `input` in the shared component.
- The application’s UI and functionality must remain unchanged after the refactoring.
- You must use `<ng-content>` for content projection.
- Do not introduce additional properties or services to pass data.
- Ensure that projected content is correctly styled and positioned as before.
