<h1>Bug Change Detection</h1>

> Author: Thomas Laforge

This challenge is inspired by a real-life example that I simplified to create this nice challenge.

### Information

In this small application, we have a navigation menu to route our application to either `barComponent` or `FooComponent`. However our application is not loading and no errors are displayed inside the console.

### Statement

The goal of the challenge is to debug this application and make it work.

#### Hints

<details>
  <summary>Hint 1</summary>
  
  If you comment out `routerLinkActive="isSelected"` inside `NavigationComponent`: the application loads correctly.
</details>

<details>
  <summary>Hint 2</summary>

If you open the [`RouterLinkActive` source code](https://github.com/angular/angular/blob/main/packages/router/src/directives/router_link_active.ts) and go to **line 196**, Angular is calling `this.cdr.markForCheck` inside a microTask which triggers a new CD cycle. If you comment out this line, the application loads again, however the bug is not inside the Angular Framework. 😅😯

</details>

### Submitting your work

1. Fork the project
2. clone it
3. npm ci
4. `npx nx serve bug-cd`
5. _...work on it_
6. Commit your work
7. Submit a PR with a title beginning with **Answer:32** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A32+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="bug-cd"/></a>
<a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A32+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="bug-cd solution author"/></a>

<!-- <a href="{Blog post url}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="bug-cd blog article"/></a>  -->

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../logo/twitter.svg" height=20px alt="twitter"/></a>
