---
title: 🔴 Pipe alternative
description: Challenge 48 is about an alternative to angulars pipe
author: sven-brodny
contributors:
  - tomalaforge
  - svenson95
challengeNumber: 48
command: angular-pipe-alternative
sidebar:
  order: 210
  badge: New
---

## Information

This is the fourth and last of four `@Pipe()` challenges, the goal of this series is to master pipes in Angular. But this part isn’t really about pipes, but it’ll help to better understand the concept of pipes.

For those who crave for maximum performance. And less boilerplate.

![giphy](https://github.com/svenson95/angular-challenges/assets/46655156/234bc9d3-70bc-4424-9bc6-065ea96ddd79)

A self written memo function is another option for replacing function calls template's. The memo function will help you in cases when you call functions and pass the same value to it, and not use it with different parameters - that will break the “cache” of the memo function.

:::note
The memo function will cache stuff per instance, and not per usage.
:::

If the parameters have changed, we call the function again with the new parameters and save its result, and if not, we return the old value. This is an improvement because we can avoid boilerplate and use a JavaScript way of handling this issue.

<img width="400" alt="Functions in Template - 1" src="https://github.com/svenson95/angular-challenges/assets/46655156/2e929c6e-ffd0-4353-873c-f8b941f86ba1">

## Conclusion

This `memo` function is pretty nice, but the pipe-way provides more decomposition. So maybe we should keep using `Pipe`s instead create functions in the components for this purpose. My personal conclusion is …

- a `memo` function can improve the code readability, so i’ll use it if the function is very simple.
- a `Pipe` provides more decomposition, so I’ll use it if the function is more complex.

Feel free to leave your feedback in the comments.

## Statement

- The project manager decides to implement a `memo` function to replace some unnecessary function calls in templates. Refactor the `getDateString()` function with a memo function, checkout this [article](https://itnext.io/its-ok-to-use-function-calls-in-angular-templates-ffdd12b0789e)
