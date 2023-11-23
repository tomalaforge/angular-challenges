---
title: 🟢 Checkbox
description: Challenge 28 is about testing a simple checkbox
author: thomas-laforge
challengeNumber: 28
command: testing-checkbox
sidebar:
  order: 10
---

## Information

This application is very simple. It consists of a checkbox that enables or disables a button. The primary goal of this application is to become familiar with the debug API of Testing Library. Knowing how to debug your tests is a crucial tool you need to have in your toolkit.

You can find the documentation about debugging in Testing Library [here](https://testing-library.com/docs/dom-testing-library/api-debugging#screenlogtestingplaygroundurl).

The main functions to remember are as follows:

- `logRoles(myDOMElement)`: prints out all ARIA roles within the tree of the given DOM element. ARIA roles are the primary selectors you should reach for in the first place.
- `screen.debug()` or `screen.debug(myDOMElement)`: prints the DOM inside the console.
- `screen.logTestingPlaygroundURL()` or `screen.logTestingPlaygroundURL(myDOMElement)`: this function is very powerful. It will create a playground to expose all elements, and you can interact with it to see the selectors you should choose for a DOM element.

## Statement

The goal of this challenge is not to submit an answer, but you can if you want. It's more about using the debugging API to play around. These tools will be of great help for the upcoming testing challenges.
