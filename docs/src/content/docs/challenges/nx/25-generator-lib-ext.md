---
title: 🔴 Extend Lib Generator
description: Challenge 25 is about creating a Nx generator to extend the built-in Library Generator
sidebar:
  order: 25
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

## Information

Welcome to the marvelous world of Nx generators.

Generators are awesome tools that can help you and your team generate code more quickly, especially for pieces of code that you use frequently. While using Nx, you create libraries regularly, but sometimes the default generator doesn't perfectly meet your needs.

## Statement

The goal of this challenge is to create a generator that extends the default library generator of Nx. You will need to override the default `jest.config.ts` and a `eslintrc.json` with a custom one.

You can either use all the default parameters of the Nx library generator or choose to modify some and keep others as defaults. The choice is yours.

## Constraints:

You should only override the jest configuration is the `unitTestRunner` option is set at `JEST`, and you should only update the eslint configuration if the `linter` is set to `eslint`.

---

`jest.config.ts`

```ts
/* eslint-disable */
export default {
  displayName: '< libName >', // 👈 lib name
  preset: '../../../jest.preset.js', // 👈 be careful with the path
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|lodash-es))'],
};
```

---

`eslintrc.json`

add this rule `"@typescript-eslint/member-ordering": "off"` inside the rules properties of ts files.

---

:::tip[Reminder]
Your PR title must start with <b>Answer:25</b>.
:::

<div class="article-footer">
  <a
    href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A25+label%3Aanswer"
    alt="Extend Lib Generator community solutions">
    ❖ Community Answers
  </a>
  <a
    href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A25+label%3A'
    alt="Extend Lib Generator solution author">
    ▶︎ Author Answer
  </a>
  </div>
