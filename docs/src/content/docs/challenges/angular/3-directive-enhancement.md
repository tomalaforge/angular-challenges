---
title: 🟠 Directive Enhancement
description: Challenge 3 is about enhancing a built-in directive
author: thomas-laforge
challengeNumber: 3
command: angular-ngfor-enhancement
blogLink: https://medium.com/@thomas.laforge/ngfor-enhancement-716b44656a6c
sidebar:
  order: 101
---

:::note
This exercice can feel obsolete with the new control flow and the empty block inside the `@for` block. However **structural directives** are not going to be deleted any time soon, so you can still learn a lot from this exercice.
:::

## Information

Directive is a very powerful tool only offered by the Angular framework. You can apply the DRY principal by having shared logic inside a directive and applying it to any component you want.

But the real power is that you can enhance an already existing directive which moreover doesn't **belong** to you.

## Statement

In this exercice, we have a want to display a list of persons. If the list is empty, you must display _" the list is empty !! "_.

Currently we have :

```typescript
    <ng-container *ngIf="persons.length > 0; else emptyList">
      <div *ngFor="let person of persons">
        {{ person.name }}
      </div>
    </ng-container>
    <ng-template #emptyList>The list is empty !!</ng-template>
```

We want to get rid of the ng-container by writing :

```typescript
    <div *ngFor="let person of persons; empty: emptyList">
    {{ person.name }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
```

The goal is to **improve the ngFor directive**
