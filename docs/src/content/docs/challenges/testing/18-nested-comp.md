---
title: 🟠 Nested Components
description: Challenge 18 is about testing nested components
sidebar:
  order: 109
---

<div class="chip">Challenge #18</div>

## Information

We have a small application that sends a title, typed into an input to a fake backend.
If the title is correctly typed, you can send the request otherwise you receive an error and the request is not sent.
The application is created with <b>nested components</b>. `ChildComponent` is the container that includes four components: `ResultComponent`, `ButtonComponent`, `InputComponent` and `ErrorComponent`. However since we are testing our component as a black box, the architecture of our components doesn't change anything. You can create your test, change how the components are structured, and your tests should still pass. That's the goal of integration tests. <b>Never test internal implementation details!!!</b>.

You can play with it by running : `npx nx serve testing-nested`.

The file named `child.component.spec.ts` will let test your application using Testing Library. To run the test suits, you need to run `npx nx test testing-nested`. You can also install [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) to execute your test by clicking on the `Run` button above each `describe` or `it` blocks.

For testing cypress, you will execute your test inside the `child.component.cy.ts` and run `npx nx component-test testing-nested` to execute your test suits. You can add the `--watch` flag to execute your test in watch mode.

# Statement

The goal is to test multiple behaviors of the application describe inside each test files using Testing library and Cypress Component Testing.

:::note
I have created some `it` blocks but feel free to add more tests if you want.
:::

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
