---
title: 🟠 Optimize Change Detection
description: Challenge 12 about optimizing the number of change detection cycle while scrolling
sidebar:
  order: 12
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

<div class="chip">Challenge #12</div>

## Information

In this challenge, you will need to optimize the change detection cycles run by Angular.

Zone.js triggers a change detection cycle each time a scroll event is dispatched. However we only want to show or hide a button at a specific scroll position. Therefore, we only want to refresh our application once.

> You can vizualise how many times CD is triggered by installing the [Angular chrome devTool](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh) and starting a new recording on the profiler tab.

The following video will explain what is the goal of this challenge.

<video controls src="https://user-images.githubusercontent.com/30832608/209819211-58d9ddcf-e1ad-4a78-8a7a-2be9d729e3f1.mov">
</video>

## Statement

Your goal for this challenge is to avoid all unnecessary change detection cycles and trigger a CD only when needed.

## Constraint:

You cannot opt-out of zone.js. If this code is part of a large project and you opt out of zone.js, you will break many things within your application.

---

:::note
Start the project by running: `npx nx serve scroll-cd`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:12</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A12+label%3Aanswer"
    alt="Optimize Change Detection community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A{challenge number}+label%3A'
    alt="Optimize Change Detection solution author">
    ▶︎ Author Answer
  </a>
  </div>
