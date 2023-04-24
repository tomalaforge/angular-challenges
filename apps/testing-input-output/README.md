<h1>Input / Output testing</h1>

> Author: Thomas Laforge

### Statement:

We have a small counter application that increment or decrement a number.
You can play with it by running : `npx nx serve testing-input-output`.

The goal is to test `CounterComponent` with Testing library and Cypress

The file named `counter.component.spec.ts` will let test your application using Testing Library. To run the test suits, you need to run `npx nx test testing-nested`. You can also install [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) to execute your test by clicking on the `Run` button above each `describe` or `it` blocks.

For testing cypress, you will execute your test inside the `counter.component.cy.ts` and run `npx nx component-test testing-nested` to execute your test suits. You can add the `--watch` flag to execute your test in watch mode.

I created some `it` blocks but feel free to add more test if you like to.

### Submitting your work

1. Fork the project
2. clone it
3. npm install
4. `npx nx serve testing-input-output` to play with the application
5. `npx nx test testing-input-output` to test your application with Testing Library
6. `npx nx component-test testing-input-output --watch` to test your application with Cypress
7. _...work on it_
8. Commit your work
9. Submit a PR with a title beginning with **Answer:19** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A19+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="input output testing"/></a>
<a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A19+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="input output testing solution author"/></a>

<!-- <a href="{Blog post url}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="input output testing blog article"/></a> -->

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../logo/twitter.svg" height=20px alt="twitter"/></a>
