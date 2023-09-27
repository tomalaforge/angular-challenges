---
title: 🟠 Nested Components
description: Challenge 18 is about testing nested components
sidebar:
  order: 18
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

<div class="chip">Challenge #18</div>

## Statement:

We have a small application that send a title to a fake backend that you type inside a input.
If the title is correctly typed, you can send the request otherwise you get a nice error and the request is not sent.
You can play with it by running : `npx nx serve testing-nested`.

The goal is to test this behavior with Testing library and Cypress

The file named `child.component.spec.ts` will let test your application using Testing Library. To run the test suits, you need to run `npx nx test testing-nested`. You can also install [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) to execute your test by clicking on the `Run` button above each `describe` or `it` blocks.

For testing cypress, you will execute your test inside the `child.component.cy.ts` and run `npx nx component-test testing-nested` to execute your test suits. You can add the `--watch` flag to execute your test in watch mode.

I created some `it` blocks but feel free to add more test if you like to.

---

:::note
Start the project by running: `npx nx serve testing-nested`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:18</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A18+label%3Aanswer"
    alt="Nested Components community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A18+label%3A"answer+author"'
    alt="Nested Components solution author">
    ▶︎ Author Answer
  </a>
  </div>
