---
title: 🟠 Input Output
description: Challenge 19 is about testing inputs and ouputs
sidebar:
  order: 110
---

<div class="chip">Challenge #19</div>

## Information:

We have a small counter application that increments or decrements a number. The `CounterComponent` takes an initial value as an `@Input` and emits the result of the counter as an `@Output` when we click on the **Send** button. Since we are testing our component as a black box, we only have access to our inputs and listen to the output values. <b>We should not rely on any internal implementation details!!!</b>

You can play with it by running : `npx nx serve testing-input-output`.

The file named `counter.component.spec.ts` will let test your application using Testing Library. To run the test suits, you need to run `npx nx test testing-input-output`. You can also install [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) to execute your test by clicking on the `Run` button above each `describe` or `it` blocks.

For testing cypress, you will execute your test inside the `child.component.cy.ts` and run `npx nx component-test testing-input-output` to execute your test suits. You can add the `--watch` flag to execute your test in watch mode.

# Statement

The goal is to test multiple behaviors of the application describe inside each test files using Testing library and Cypress Component Testing.

:::note
I have created some `it` blocks but feel free to add more tests if you want.
:::

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
