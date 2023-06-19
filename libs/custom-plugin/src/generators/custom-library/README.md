<h1>Create a generator to extend @nx/angular-lib</h1>

> Author: Thomas Laforge

### Information

Welcome to the marvelous world of Nx generators.

Generators are awesome tools that can help you and your team generate code more quickly, especially for pieces of code that you use frequently. While using Nx, you create libraries regularly, but sometimes the default generator doesn't perfectly meet your needs.

### Statement

The goal of this challenge is to create a generator that extends the default library generator of Nx. You will need to override the default `jest.config.ts` and a `eslintrc.json` with a custom one.

You can either use all the default parameters of the Nx library generator or choose to modify some and keep others as defaults. The choice is yours.

### Constraints:

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

### Submitting your work

1. Fork the project
2. clone it
3. npm ci
4. _...work on it_
5. Commit your work
6. Submit a PR with a title beginning with **Answer:25** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A25+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="extends-lib"/></a>
<a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A25+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="extends-lib solution author"/></a>

<!-- <a href="{Blog post url}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="extends-lib blog article"/></a> -->

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../../../../logo/twitter.svg" height=20px alt="twitter"/></a>
