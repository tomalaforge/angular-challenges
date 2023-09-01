<h1>decoupling component with InjectionToken</h1>

> Author: Thomas Laforge

> Big thanks to **Robin Goetz** and his [Spartan Project](https://github.com/goetzrobin/spartan).
> This challenge was proposed by Robin and is strongly inspired by his project.

### Information

The goal of this challenge is to separate the behavior of a component from its style. For the purpose of this challenge, we will be working on a button element. When we click on it, we will toggle a _disabled_ property which will change the style of the element. This is quite useless in real life but the challenge aims to demonstate a useful concept.

The behavior of the component (referred to as the _brain_ in the Spartan stack) is located in the brain library. The styling part (referred to as the _helmet_) is located inside the helmet library. Both libraries cannot depend on each other because we want to be able to publish them separatly. To help us address the issue, we are using the Nx enforce eslint rule. You can find more details [here](https://nx.dev/core-features/enforce-module-boundaries);

However the button's helmet needs to access the state of the component to style the button differently based on its state. As mention above, we cannot import the `BtnDisabledDirective` directly into the helmet library as done currently. If you go to [`BtnHelmetDirective`](../../libs/decoupling/helmet/src/lib/btn-style.directive.ts), you will encounter a linting error. **A project tagged with "type:hlm" can only depend on libs tagged with "type:core"**.

### Statement

The goal of this challenge is to find a way to decouple both Directives.

### Hint

<details>
  <summary>Hint 1</summary>
  Carefully read the title of the challenge 😇
</details>

### Submitting your work

1. Fork the project
2. clone it
3. npm ci
4. `npx nx lint decoupling-helmet` to visualize the error.
5. `npx nx serve decoupling`
6. _...work on it_
7. Commit your work
8. Submit a PR with a title beginning with **Answer:33** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A33+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="decoupling"/></a>
<a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A33+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="decoupling solution author"/></a>

<!-- <a href="{Blog post url}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="decoupling blog article"/></a>  -->

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../logo/twitter.svg" height=20px alt="twitter"/></a>
