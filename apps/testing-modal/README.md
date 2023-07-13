<h1>Modal testing</h1>

> Author: Thomas Laforge

### Statement:

The goal of this challenge is to test dialogs inside your application.
Within this program, you will get an error modal if the user doesn't input a name, while a confirmation modal will appear in all other cases.
In the confirmation modal, if you click the "confirm" button, a message confirming the submission of the form will appear. Otherwise, if the user clicks on "Cancel", an error message will be displayed.

You can play with it by running : `npx nx serve testing-modal`.

The goal is to test this behavior with Testing library and Cypress

The file named `app.component.spec.ts` will let test your application using Testing Library. To run the test suits, you need to run `npx nx test testing-modal`. You can also install [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) to execute your test by clicking on the `Run` button above each `describe` or `it` blocks.

For testing cypress, you will execute your test inside the `app.component.cy.ts` and run `npx nx component-test testing-modal` to execute your test suits. You can add the `--watch` flag to execute your test in watch mode.

I created some `it` blocks but feel free to add more test if you like to.

### Submitting your work

1. Fork the project
2. clone it
3. npm ci
4. `npx nx serve testing-modal` to play with the application
5. `npx nx test testing-modal` to test your application with Testing Library
6. `npx nx component-test testing-modal --watch` to test your application with Cypress
7. _...work on it_
8. Commit your work
9. Submit a PR with a title beginning with **Answer:20** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A20+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="modal testing"/></a>
<a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A20+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="modal testing solution author"/></a>

<!-- <a href="{Blog post url}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="nested testing blog article"/></a> -->

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../logo/twitter.svg" height=20px alt="twitter"/></a>
