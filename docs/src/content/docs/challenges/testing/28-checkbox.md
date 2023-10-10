---
title: 🟢 Checkbox
description: Challenge 28 is about testing a simple checkbox
sidebar:
  order: 10
---

<div class="chip">Challenge #28</div>

## Information

This application is very simple. It consists of a checkbox that enables or disables a button. The primary goal of this application is to become familiar with the debug API of Testing Library. Knowing how to debug your tests is a crucial tool you need to have in your toolkit.

You can find the documentation about debugging in Testing Library [here](https://testing-library.com/docs/dom-testing-library/api-debugging#screenlogtestingplaygroundurl).

The main functions to remember are as follows:

- `logRoles(myDOMElement)`: prints out all ARIA roles within the tree of the given DOM element. ARIA roles are the primary selectors you should reach for in the first place.
- `screen.debug()` or `screen.debug(myDOMElement)`: prints the DOM inside the console.
- `screen.logTestingPlaygroundURL()` or `screen.logTestingPlaygroundURL(myDOMElement)`: this function is very powerful. It will create a playground to expose all elements, and you can interact with it to see the selectors you should choose for a DOM element.

## Statement

The goal of this challenge is not to submit an answer, but you can if you want. It's more about using the debugging API to play around. These tools will be of great help for the upcoming testing challenges.

---

:::note
Start the project by running: `npx nx serve testing-checkbox`.
:::

:::tip[Reminder]
Your PR title must start with <b>Answer:28</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A28+label%3Aanswer"
    alt="Checkbox community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A28+label%3A"answer+author"'
    alt="Checkbox solution author">
    ▶︎ Author Answer
  </a>
  </div>
