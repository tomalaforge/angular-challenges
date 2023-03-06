<h1>Dependancy Injection</h1>

> Author: Thomas Laforge

### Information

To successfully complete this challenge, you will need to have a good understanding of how Dependency Injection works inside Angular.

The goal is to provide the CurrencyService at the row level, so that each row displays the correct currency. Currently, the CurrencyService is only provided at the table level, which results in an error as the same currency is displayed for each row, despite each product having a different currency.

One way to achieve this is by adding a second argument to the pipe, but this is not allowed.

### Statement

- Your task is to display the correct currency for each row.

### Constraints:

- You cannot modify the pipe.
- You cannot wrap the row inside a component, as this will break the layout.

### Submitting your work

1. Fork the project
2. clone it
3. npm install
4. `npx nx serve di`
5. _...work on it_
6. Commit your work
7. Submit a PR with a title beginning with **Answer:16** that I will review and other dev can review.

<!-- TODO: add challenge number and project Name -->

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A16+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="DI"/></a>

<!-- TODO: uncomment when done late -->
<!-- <a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A16+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="DI solution author"/></a>
<a href="{Blog post url}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="DI blog article"/></a> -->

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../logo/twitter.svg" height=20px alt="twitter"/></a>
