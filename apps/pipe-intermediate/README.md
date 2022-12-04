<h1>WrapFn pipe</h1>

> Author: Thomas Laforge

The goal of this serie of 3 pipe challenges is to master PIPES in Angular.

Pure pipe are a very useful way to transform data from your template. The difference between calling a function and a pipe is that pure pire are memoized. So they won't be recalculated every change detection cycle if the inputs hasn't changed.

### Information:

In this second exercice, you add calling multiple functions inside your template. You can create a pipe for each of this function but this will be a bit too much to create that much specific pipe.
The goal is to create a wrapFn pipe to wrap your function calls though a pipe.

### Constraints:

- must be strongly typed

### Submitting your work

1. Fork the project
2. clone it
3. npm install
4. **nx serve pipe-intermediate**
5. _...work on it_
6. Commit your work
7. Submit a PR with a title beginning with **Answer:9** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A9+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="WrapFn pipe"/></a>

<!-- TODO: uncomment when done late -->
<!-- <a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A{challenge number}+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="{Project name} solution author"/></a>
<a href="{Blog post url}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="{Project name} blog article"/></a> -->

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../logo/twitter.svg" height=20px alt="twitter"/></a>
