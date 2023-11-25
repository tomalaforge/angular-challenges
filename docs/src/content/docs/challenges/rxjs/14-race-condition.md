---
title: 🟢 Race Condition
description: Challenge 14 is about race condition in Rxjs
author: thomas-laforge
challengeNumber: 14
command: rxjs-race-condition
sidebar:
  order: 11
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

## Information

The goal of this application is to display a list of topics in a modal when a button is clicked. The application functions correctly. However, your tech lead has asked you to add tests and they are failing.

## Statement

Correct your application to pass the test

## Constraints:

- I can see you coming 🤣 => You CANNOT change the test (Test is working fine) 😳
- You CANNOT change the `fakeGetHttpTopic` method. A delay has been added to fake a slow network.

## Run the test

HEADLESS : `npx nx component-test rxjs-race-condition`
WATCH MODE : `npx nx component-test rxjs-race-condition --watch`
