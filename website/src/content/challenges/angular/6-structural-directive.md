---
title: 🟠 Structural Directive
description: Challenge 6 is about creating a structural directive to handle permissions
author: thomas-laforge
contributors:
  - tomalaforge
  - tomer953
  - kabrunko-dev
  - svenson95
challengeNumber: 6
command: angular-structural-directive
blogLink: https://medium.com/@thomas.laforge/create-a-custom-structural-directive-to-manage-permissions-like-a-pro-11a1acad30ad
sidebar:
  order: 102
---

## Information

Structural directives are directives which change the DOM layout by adding and removing DOM elements. This is an important concept you'll need to improve your angular skills and knowledge. This will be the first part of this challenge. For more information check out the [official documentation](https://angular.dev/guide/directives/structural-directives).

Guards like `CanActivate` or `CanMatch` are also very important, since you'll need it in the most application's you build. If you're not very familiar with route guards, check out this two articles.

- [Everything you need to know about route Guard in Angular](https://itnext.io/everything-you-need-to-know-about-route-guard-in-angular-697a062d3198)
- [Create a route Guard to manage permissions](https://medium.com/@thomas.laforge/create-a-route-guard-to-manage-permissions-26f16cc9a1ca)

## Statement

In `LoginComponent` you'll find 6 buttons corresponding to 6 different user's role.

- Admin
- Manager
- Reader
- Writer
- Reader and Writer
- Client
- Everyone

## Step 1

In `InformationComponent` you'll need to display the correct piece of information for each role using a structural directive.

### Constraints

- No `ngIf` or `@if` inside `InformationComponent`.
- Importing the store inside `InformationComponent` is not allowed.

You should end up with something like below:

```html
<div *hasRole="Role1">Info for Role1</div>
```

```html
<div *hasRole="['Role1', 'Role2']">Info for Role1 and Role2</div>
```

```html
<div *hasRoleSuperAdmin="true">Info Only for superadmin</div>
```

## Step 2

In `Routes.ts` you should route all users to the correct `DashboardComponent` using `CanMatch` guard.
