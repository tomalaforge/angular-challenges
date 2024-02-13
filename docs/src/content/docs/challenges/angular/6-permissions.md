---
title: 🟠 Structural Directive
description: Challenge 6 is about creating a structural directive to handle permissions
author: thomas-laforge
challengeNumber: 6
command: angular-permissions
blogLink: https://medium.com/@thomas.laforge/create-a-custom-structural-directive-to-manage-permissions-like-a-pro-11a1acad30ad
sidebar:
  order: 102
---

## Information

Structural directive is an important concept you will need to master to improve your angular skills and knowledge. This will be the first part of this challenge.

Guard is also very important since you will always need it in every application you build.

## Statement

In LoginComponent, you will find 6 buttons corresponding to 6 differents user's role.

- Admin
- Manager
- Reader
- Writer
- Reader and Writer
- Client
- Everyone

## Step 1

In `InformationComponent`, you need to display the correct piece of information for each role using a structural directive.

### Constraints

- no `ngIf` or `@if` inside `InformationComponent`
- importing the store inside `InformationComponent` is not allowed.

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

In `Routes.ts`, you should route all users to the correct `DashboardComponent` using `CanMatch` guard.
