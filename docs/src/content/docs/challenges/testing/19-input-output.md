---
title: 🟠 Input Output
description: Challenge 19 is about testing inputs and ouputs
sidebar:
  order: 110
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

<div class="chip">Challenge #19</div>

## Statement:

We have a small counter application that increment or decrement a number.
You can play with it by running : `npx nx serve testing-input-output`.

The goal is to test `CounterComponent` with Testing library and Cypress

The file named `counter.component.spec.ts` will let test your application using Testing Library. To run the test suits, you need to run `npx nx test testing-nested`. You can also install [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) to execute your test by clicking on the `Run` button above each `describe` or `it` blocks.

For testing cypress, you will execute your test inside the `counter.component.cy.ts` and run `npx nx component-test testing-nested` to execute your test suits. You can add the `--watch` flag to execute your test in watch mode.

I created some `it` blocks but feel free to add more test if you like to.

---

:::note
Start the project by running: `npx nx serve testing-input-output`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:19</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A19+label%3Aanswer"
    alt="Input Output community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A19+label%3A"answer+author"'
    alt="Input Output solution author">
    ▶︎ Author Answer
  </a>
  </div>
