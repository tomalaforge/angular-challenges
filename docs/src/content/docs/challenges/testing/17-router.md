---
title: 🟠 Router
description: Challenge 17 is about testing the router
sidebar:
  order: 17
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

<div class="chip">Challenge #17</div>

## Information

Testing is a crucial step in building scalable, maintainable, and trustworthy applications.
Testing should never be avoided, even in the face of short deadlines or strong pressure from the product team.
Nowadays, there are numerous awesome tools available that make it easy to test your code and provide a great developer experience.

In this series of testing exercises, we will learn and master [Testing Library](https://testing-library.com/docs/) and [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/angular/overview) that simplifies DOM manipulation for testing any Angular component.

## Statement:

We have a functional application that lists available books for borrowing inside a library. If the book you searched is available, you will be directed to the corresponding book(s), otherwise, you will end up on an error page.

The goal is to test this behavior with Testing library and Cypress

The file named `app.component.spec.ts` will let test your application using Testing Library. To run the test suits, you need to run `npx nx test testing-router-outlet`. You can also install [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) to execute your test by clicking on the `Run` button above each `describe` or `it` blocks.

For testing cypress, you will execute your test inside the `app.component.cy.ts` and run `npx nx component-test testing-router-outlet` to execute your test suits. You can add the `--watch` flag to execute your test in watch mode.

I created some `it` blocks but feel free to add more test if you like to.

---

:::note
Start the project by running: `npx nx serve testing-router-outlet`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:17</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A17+label%3Aanswer"
    alt="Router community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A17+label%3A'
    alt="Router solution author">
    ▶︎ Author Answer
  </a>
  </div>
