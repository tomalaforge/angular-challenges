<h1>Table testing</h1>

> author: thomas-laforge

## Statement:

NOT IMPLEMENTED YET

<!-- We have a small application that send a title to a fake backend that you type inside a input.
If the title is correctly typed, you can send the request otherwise you get a nice error and the request is not sent.
You can play with it by running : `npx nx serve testing-table`.

The goal is to test this behavior with Testing library and Cypress

The file named `child.component.spec.ts` will let test your application using Testing Library. To run the test suits, you need to run `npx nx test testing-table`. You can also install [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) to execute your test by clicking on the `Run` button above each `describe` or `it` blocks.

For testing cypress, you will execute your test inside the `child.component.cy.ts` and run `npx nx component-test testing-table` to execute your test suits. You can add the `--watch` flag to execute your test in watch mode.

I created some `it` blocks but feel free to add more test if you like to. -->

### Submitting your work

1. Fork the project
2. clone it
3. npm ci
4. `npx nx serve testing-table` to play with the application
5. `npx nx test testing-table` to test your application with Testing Library
6. `npx nx component-test testing-table --watch` to test your application with Cypress
7. _...work on it_
8. Commit your work
9. Submit a PR with a title beginning with **Answer:22** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A22+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="nested testing"/></a>
<a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A22+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="nested testing solution author"/></a>

<!-- <a href="{Blog post url}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="nested testing blog article"/></a> -->

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../logo/twitter.svg" height=20px alt="twitter"/></a>
