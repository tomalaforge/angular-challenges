<h1>Function overload</h1>

> Author: Thomas Laforge

### Information

Angular uses TypeScript, and mastering TypeScript can help you avoid runtime errors by catching them at compile time.

In this challenge, we have a function to create a vehicle. However, each vehicle type requires different mandatory properties.
Currently, we are getting an error at runtime if one property is missing and we don't get the return Type, which is not ideal.
One solution would be to create a separate function for each vehicle type, but for this challenge, I want to use the same function and have TypeScript automatically complete the properties depending on the type passed as the first parameter.

To achieve this, we will use overload functions.

### Statement

- Use function overload

### Submitting your work

1. Fork the project
2. clone it
3. npm install
4. **`npx nx serve overload`**
5. _...work on it_
6. Commit your work
7. Submit a PR with a title beginning with **Answer:15** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A15+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="overload"/></a>

<!-- TODO: uncomment when done late -->
<!-- <a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A15+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="overload solution author"/></a>
<a href="{Blog post url}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="overload blog article"/></a> -->

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../logo/twitter.svg" height=20px alt="twitter"/></a>
