<h1>Router Testing</h1>

> Author: Thomas Laforge

### Information

Testing is a crucial step in building scalable, maintainable, and trustworthy applications.
Testing should never be avoided, even in the face of short deadlines or strong pressure from the product team.
Nowadays, there are numerous awesome tools available that make it easy to test your code and provide a great developer experience.

In this series of testing exercises, we will learn and master [Testing Library](https://testing-library.com/docs/) and [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/angular/overview) that simplifies DOM manipulation for testing any Angular component.

### Statement:

We have a functional application that lists available books for borrowing inside a library. If the book you searched is available, you will be directed to the corresponding book(s), otherwise, you will end up on an error page.

The goal is to test this behavior with Testing library and Cypress

The file named `app.component.spec.ts` will let test your application using Testing Library. To run the test suits, you need to run `npx nx test testing-router-outlet`. You can also install [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) to execute your test by clicking on the `Run` button above each `describe` or `it` blocks.

For testing cypress, you will execute your test inside the `app.component.cy.ts` and run `npx nx component-test testing-router-outlet` to execute your test suits. You can add the `--watch` flag to execute your test in watch mode.

I created some `it` blocks but feel free to add more test if you like to.

### Submitting your work

1. Fork the project
2. clone it
3. npm ci
4. `npx nx serve testing-router-outlet` to play with the application
5. `npx nx test testing-router-outlet` to test your application with Testing Library
6. `npx nx component-test testing-router-outlet --watch` to test your application with Cypress
7. _...work on it_
8. Commit your work
9. Submit a PR with a title beginning with **Answer:17** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A17+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="router testing"/></a>
<a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A17+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="router testing solution author"/></a>

<!-- <a href="{Blog post url}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="router testing blog article"/></a> -->

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../logo/twitter.svg" height=20px alt="twitter"/></a>
