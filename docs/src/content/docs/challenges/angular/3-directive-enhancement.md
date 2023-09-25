---
title: 🟠 Directive Enhancement
description: Challenge 3 is about enhancing a built-in directive
sidebar:
  order: 3
---

:::note
WIP
:::

<div class="chip">Challenge #3</div>

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

---

:::note
Start the project by running: `npx nx serve ngfor-enhancement`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:3</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A3+label%3Aanswer"
    alt="Directive Enhancement community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A3+label%3A'
    alt="Directive Enhancement solution author">
    ▶︎ Author Answer
  </a>
  <a
    href='https://medium.com/@thomas.laforge/ngfor-enhancement-716b44656a6c'
    target="_blank"
    rel="noopener noreferrer"
    alt="Directive Enhancement blog article">
    <svg aria-hidden="true" class="astro-yzt5nm4y astro-lq7oo3uf" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1.5rem;"><path d="M9 10h1a1 1 0 1 0 0-2H9a1 1 0 0 0 0 2Zm0 2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9Zm11-3.06a1.3 1.3 0 0 0-.06-.27v-.09c-.05-.1-.11-.2-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19h-.09a.88.88 0 0 0-.33-.11H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.94Zm-6-3.53L16.59 8H15a1 1 0 0 1-1-1V5.41ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5v3a3 3 0 0 0 3 3h3v9Zm-3-3H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Z"></path></svg>
     Blog Post
  </a>
</div>
