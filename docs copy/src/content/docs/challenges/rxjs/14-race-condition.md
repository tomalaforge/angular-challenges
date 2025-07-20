---
title: 🟢 Race Condition
description: Challenge 14 is about race condition in Rxjs
author: thomas-laforge
contributors:
  - tomalaforge
  - LMFinney
challengeNumber: 14
command: rxjs-race-condition
sidebar:
  order: 11
---

## Information

The goal of this application is to display a list of topics in a modal when a button is clicked. The application functions correctly. However, your tech lead has asked you to add tests and they are failing.

## Statement

Correct your application to pass the test

## Constraints

- I can see you coming 🤣 => You CANNOT change the test (the test is working fine) 😳
- You CANNOT change the `fakeGetHttpTopic` method. A delay has been added to fake a slow network.

## Run the test

HEADLESS : `npx nx test rxjs-race-condition`
WATCH MODE : `npx nx test rxjs-race-condition --watch`
