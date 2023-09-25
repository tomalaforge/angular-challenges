---
title: 🔴 Typed ContextOutlet
description: Challenge 4 is about strongly typing ngContextOutlet directives
sidebar:
  order: 4
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

<div class="chip">Challenge #4</div>

## Information

Angular offer the static function **ngTemplateContextGuard** to strongly type structural directive.

However the context of **NgTemplateOutlet** type is **Object**. But which the help of the above guard, we can improve that behavior.

## Statement

In this exercice, we want to learn how to strongly typed our ng-template in our AppComponent.

This exercice has two level of complexity.

### Level 1: known Interface

Currently we have the following piece of code.

![Unkown Person](../../../../assets/4/unknown-person.png 'Unkown Person')

As we can see, name is of type "any". We want to infer the correct type.

### Level 2: generic Interface

Currently we have the following piece of code.

![Unkown Student](../../../../assets/4/unknown-student.png 'Unkown Student')

As we can see, student is of type "any". We want to infer the correct type.

But in this part, we can pass to ListComponent, a list of **any object**. And we still want the correct type to be infered.

---

:::note
Start the project by running: `npx nx serve context-outlet-type`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:4</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A4+label%3Aanswer"
    alt="Typed ContextOutlet community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A4+label%3A'
    alt="Typed ContextOutlet solution author">
    ▶︎ Author Answer
  </a>
  <a
    href='https://medium.com/@thomas.laforge/ngtemplateoutlet-type-checking-5d2dcb07a2c6'
    target="_blank"
    rel="noopener noreferrer"
    alt="Typed ContextOutlet blog article">
    <svg aria-hidden="true" class="astro-yzt5nm4y astro-lq7oo3uf" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="--sl-icon-size: 1.5rem;"><path d="M9 10h1a1 1 0 1 0 0-2H9a1 1 0 0 0 0 2Zm0 2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9Zm11-3.06a1.3 1.3 0 0 0-.06-.27v-.09c-.05-.1-.11-.2-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19h-.09a.88.88 0 0 0-.33-.11H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.94Zm-6-3.53L16.59 8H15a1 1 0 0 1-1-1V5.41ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5v3a3 3 0 0 0 3 3h3v9Zm-3-3H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Z"></path></svg>
     Blog Post
  </a>
</div>
