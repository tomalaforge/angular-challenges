---
title: 🟠 Function Overload
description: Challenge 15 is about creating overload functions
author: thomas-laforge
contributors:
  - tomalaforge
  - LMFinney
challengeNumber: 15
command: typescript-function-overload
blogLink: https://medium.com/ngconf/function-overloading-in-typescript-8236706b2c05
sidebar:
  order: 115
---

## Information

Angular uses TypeScript, and mastering TypeScript can help you avoid runtime errors by catching them at compile time.

In this challenge, we have a function to create a vehicle. However, each vehicle type requires different mandatory properties.
Currently, we are getting an error at runtime if one property is missing, and we don't get the return Type, which is not ideal.
One solution would be to create a separate function for each vehicle type, but for this challenge, I want to use the same function and have TypeScript automatically complete the properties depending on the type passed as the first parameter.

To achieve this, we will use overload functions.

## Statement

- Use function overload
