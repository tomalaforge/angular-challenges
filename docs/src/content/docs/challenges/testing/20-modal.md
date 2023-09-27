---
title: 🟠 Modal
description: Challenge 20 is about testing modals
sidebar:
  order: 20
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

<div class="chip">Challenge #20</div>

## Statement:

The goal of this challenge is to test dialogs inside your application.
Within this program, you will get an error modal if the user doesn't input a name, while a confirmation modal will appear in all other cases.
In the confirmation modal, if you click the "confirm" button, a message confirming the submission of the form will appear. Otherwise, if the user clicks on "Cancel", an error message will be displayed.

You can play with it by running : `npx nx serve testing-modal`.

The goal is to test this behavior with Testing library and Cypress

The file named `app.component.spec.ts` will let test your application using Testing Library. To run the test suits, you need to run `npx nx test testing-modal`. You can also install [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) to execute your test by clicking on the `Run` button above each `describe` or `it` blocks.

For testing cypress, you will execute your test inside the `app.component.cy.ts` and run `npx nx component-test testing-modal` to execute your test suits. You can add the `--watch` flag to execute your test in watch mode.

I created some `it` blocks but feel free to add more test if you like to.

---

:::note
Start the project by running: `npx nx serve testing-modal`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:20</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A20+label%3Aanswer"
    alt="Modal community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A20+label%3A"answer+author"'
    alt="Modal solution author">
    ▶︎ Author Answer
  </a>
  </div>
