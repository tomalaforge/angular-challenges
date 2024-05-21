---
title: 🟢 Custom Eslint Rule
description: Challenge 27 is about creating a custom ESLint Rule to forbid enums
author: thomas-laforge
contributors:
  - tomalaforge
  - jdegand
challengeNumber: 27
sidebar:
  order: 12
---

## Information

ESLint is an amazing tool that helps developers avoid simple mistakes and adhere to company style guides.

In this first example, we will create a rule that forbids the use of enums. The rule will suggest using string unions instead of enums whenever an enum is present in this repo's code. This is a straightforward rule for learning how to create rules.

You will also need to write tests to verify the rule's functionality.

The starter code for this challenge can be found (from the root folder) inside `tools/eslint-rules/rules`.

To test the rule inside your project, add `"@nx/workspace/forbidden-enum": "error"` to the `eslintrc.json`. You can navigate to Challenge 47, `Enums vs. Union Types', and you should immediately see an error.

To assist you with AST (Abstract Syntax Tree) definitions, you can visit the [AST Explorer](https://astexplorer.net/) and use `JavaScript`, `@typescript-eslint/parser`, and `ESLint-v8` as the transformation methods. However, please note that you will only get the `type` information there. The transformation function may not work for TypeScript types since the editor is in JavaScript.

You can also check this [repo](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/rules) for ESLint rule examples.
