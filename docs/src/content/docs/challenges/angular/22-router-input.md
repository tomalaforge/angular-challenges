---
title: 🟢 @RouterInput()
description: Challenge 22 is about using the @Input decorator to retreive router params.
author: thomas-laforge
challengeNumber: 22
command: angular-router-input
blogLink: https://medium.com/ngconf/accessing-route-params-in-angular-1f8e12770617
sidebar:
  order: 5
---

## Information

In this application, we retrieve three pieces of information inside our `TestComponent` provided by the router:

- We want to retrieve `testId` found inside the params of the URL.
- We want to obtain `user` located within the query parameters of the URL.
- We want to access `permission` set inside the `data` object of the route.

In Angular versions 15 or earlier, we use `ActivatedRoute` to obtain all this information and receive them through observables to listen for URL changes.

In version 16, Angular introduced a new `Input` that can listen to route data. You can read more about it [here](https://medium.com/ngconf/accessing-route-params-in-angular-1f8e12770617).

## Statement

The goal of this exercice is to refactor the code to use the new `RouterInput` strategy.
