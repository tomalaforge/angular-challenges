---
title: 🟢 Static vs Dynamic Import
description: Challenge 42 is about understanding and fixing the eslint rule - Static imports of lazy-loaded libraries are forbidden.
author: thomas-laforge
contributors:
  - tomalaforge
challengeNumber: 42
command: nx-static-vs-dynamic-import
sidebar:
  order: 15
---

## Information

If you are using **Nx**, you might have encountered this error:

```ts
Static imports of lazy-loaded libraries are forbidden.

Library "users" is lazy-loaded in these files:

- apps/nx/static-dynamic-import/src/app/app.config.ts eslint@nx/enforce-module-boundaries
```

This error is part of the ESLint rule embedded by Nx to prevent people from mixing lazy-loading and eagerly-loading code from the same library. Although this error will not break at runtime or build time, it can lead to consequences for bundle size. The lazy-loaded code will end up in the main bundle, nullifying all the benefits of lazy-loading a library.

## Statement

The goal of this challenge is to improve the code architecture to eliminate this ESLint error.

You will learn how to create a library and how to rearrange code.
