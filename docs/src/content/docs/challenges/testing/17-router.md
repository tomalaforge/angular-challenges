---
title: 🟠 Router
description: Challenge 17 is about testing the router
author: thomas-laforge
challengeNumber: 17
command: testing-router-outlet
sidebar:
  order: 108
---

## Information

We have a functional application that lists available books for borrowing inside a library. If the book you searched for is available, you will be directed to the corresponding book(s), otherwise, you will end up on an error page.

The file named `app.component.spec.ts` will let you test your application using Testing Library. To run the test suits, you need to run `npx nx test testing-router-outlet`. You can also install [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) to execute your test by clicking on the `Run` button above each `describe` or `it` blocks.

For testing cypress, you will execute your test inside the `app.component.cy.ts` and run `npx nx component-test testing-router-outlet` to execute your test suits. You can add the `--watch` flag to execute your test in watch mode.

# Statement

The goal is to test multiple behaviors of the application described in each test file using Testing library and Cypress Component Testing.

:::note
I have created some `it` blocks but feel free to add more tests if you want.
:::
