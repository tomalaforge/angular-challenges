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

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

## Information

Structural directive is an important concept you will need to master to improve your angular skills and knowledge. This will be the first part of this challenge.

Guard is also very important since you will always need it in every application you build.

## Statement

In LoginComponent, you will find 6 buttons corresponding at 6 differents users.

- Admin
- Manager
- Reader
- Writer
- Reader and Writer
- Client
- Everyone

## Step 1

In **InformationComponent**, display the correct piece of information for each role.

### Constraints:

- no ngIf directive inside **InformationComponent**
- importing the store inside **InformationComponent** is not allowed.

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

In **Routes.ts**, route all user to the correct **DashboardComponent** using **CanMatch** guard.
