---
title: 🟠 Nested Components
description: Challenge 18 is about testing nested components
author: thomas-laforge
contributors:
  - tomalaforge
  - LMFinney
challengeNumber: 18
command: testing-nested-components
sidebar:
  order: 109
---

## Information

We have a small application that sends a title to a fake backend when the user types the value into an input.
If the title is correctly typed, you can send the request; otherwise you receive an error, and the request is not sent.
The application is created with <b>nested components</b>. `ChildComponent` is the container that includes four components: `ResultComponent`, `ButtonComponent`, `InputComponent` and `ErrorComponent`. However, since we are testing our component as a black box, the architecture of our components doesn't change anything. You can create your test, change how the components are structured, and your tests should still pass. That's the goal of integration tests. <b>Never test internal implementation details!!!</b>.

You can play with it by running : `npx nx serve testing-nested`.

The file named `child.component.spec.ts` will let you test your application using [Angular Testing Library](https://testing-library.com/) . To run the test suites, you need to run `npx nx test testing-nested`. You can also install [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) to execute your test by clicking on the `Run` button above each `describe` or `it` blocks.

For testing with Cypress, you will execute your test inside the `child.component.cy.ts` and run `npx nx component-test testing-nested` to execute your test suites. You can add the `--watch` flag to execute your test in watch mode.

# Statement

The goal is to test multiple behaviors of the application describe inside each test files using [Angular Testing Library](https://testing-library.com/) and [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/overview).

:::note
I have created some `it` blocks but feel free to add more tests if you want.
:::
