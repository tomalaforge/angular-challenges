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

This is the fourth and last of four `@Pipe()` challenges, the goal of this series is to master pipes in Angular. But this part isn’t really about pipes, but it’ll help to better understand the concept of pipes. For those who crave for maximum performance. And less boilerplate.

https://giphy.com/gifs/h24Y1pZIGKXzG

A self written memo function is another option to using function calls in the template or `Pipe`’s. The memo function will help you in cases when you call functions in the template and pass the same value to it, and not use it with different parameters - that will break the “cache” of the memo function.

The memo function will cache stuff per instance, and not per usage.

If the parameters have changed, we call the function again with the new parameters and save its result, and if not, we return the old value. This is an improvement because we can avoid boilerplate and use a JavaScript way of handling this issue.

img

## Conclusion

This `memo` function is pretty nice, but the pipe-way provides more decomposition. So maybe we should keep using `Pipe`s instead create functions in the components for this purpose. My personal conclusion is …

- a `memo` function can improve the code readability, so i’ll use it if the function is very simple.
- a `Pipe` provides more decomposition, so I’ll use it if the function is more complex.

Feel free to leave your feedback in the comments.

## Statement

- The project manager decides to implement a `memo` function to replace some unnecessary pipes. Refactor the `PluralPipe` to a memo function with the help of this [article](https://itnext.io/its-ok-to-use-function-calls-in-angular-templates-ffdd12b0789e)

:::note
Do you already know the [PluralPipe](https://angular.io/api/common/I18nPluralPipe)? It’s a cool way of pluralize values.
:::
