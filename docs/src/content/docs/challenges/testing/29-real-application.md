---
title: 🔴 Real-life Application
description: Challenge 29 is about testing a real-life application
author: thomas-laforge
challengeNumber: 29
command: testing-todos-list
sidebar:
  order: 205
---

## Information:

This application presents a greater challenge because it closely resembles a real-life application that you might encounter in your day-to-day activities as an Angular developer. What makes it more difficult is the need to handle asynchronous tasks and create appropriate mocks.

The application is a typical todo list application. You can filter tickets, create new ones, assign each ticket, close others, and navigate to the details of each ticket.

In this challenge, you will write tests for the `ListComponent`, which represents the global view, and the `RowComponent`, which represents a specific ticket. Additionally, you will need to write unit tests for the `TicketStoreService` using Testing Library. _This library allows you to test services effectively._

Handling asynchronous tasks will be particularly challenging. It's important not to introduce any explicit <b>waits</b> in your tests, as this would introduce unnecessary delays. Instead, it's better to look for an element that needs to appear or disappear from the DOM. In this case, the test will naturally wait for the correct period of time, as the waits are already implemented within both libraries. Take advantage of these built-in functionalities to create efficient and reliable tests.

You can play with it by running : `npx nx serve testing-todos-list`.

To run Testing Library test suits, you need to run `npx nx test testing-todos-list`. You can also install [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) to execute your test by clicking on the `Run` button above each `describe` or `it` blocks.

For testing cypress, you will execute your test inside the `child.component.cy.ts` and run `npx nx component-test testing-todos-list` to execute your test suits. You can add the `--watch` flag to execute your test in watch mode.

# Statement

The goal is to test multiple behaviors of the application describe inside each test files using Testing library and Cypress Component Testing.

:::note
I have created some `it` blocks but feel free to add more tests if you want.
:::
