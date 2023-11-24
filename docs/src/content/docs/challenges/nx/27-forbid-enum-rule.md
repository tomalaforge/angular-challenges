---
title: 🟢 Custom Eslint Rule
description: Challenge 27 is about creating a custom Eslint Rule to forbid enums
author: thomas-laforge
challengeNumber: 27
sidebar:
  order: 12
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

## Information

Eslint is an amazing tool that helps developers avoid simple mistakes and adhere to company style guides.

In this first example, we will create a rule that forbids the use of enums. The rule will suggest using string unions instead of enums whenever you add an enum to your code. It is a straightforward rule for learning how to create rules.

You will also need to write tests to verify the rule's functionality.

To test the rule inside your project, add `"@nrwl/nx/workspace/forbidden-enum": "error"` to the `eslintrc.json` file and attempt to insert an enum into any project to witness the magic. 😇

To assist you with AST (Abstract Syntax Tree) definitions, you can visit the [AST explorer](https://astexplorer.net/) and use JavaScript, @typescript-eslint/parser, and Eslint-v8 as the transformation method. However, please note that you will only get the type information there. The transformation function may not work for TypeScript types since the editor is in JavaScript.

You can also check this [repo](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/rules) for eslint rule examples.
