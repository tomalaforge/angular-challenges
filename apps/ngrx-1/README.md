<h1>NgRx Effect vs Selector</h1>

For this exercice, you will have a dashboard of activities displaying the name, the main teacher and a list of subtitutes.

## Information

In NgRx, **selectors** is a very powerful tool often **misused**. You should use them as soon as you need to transform an already existing data in the store.

- You shouldn't store **derived state**. This is error prone because when your data change, you will have to change it at multiple places => you should have only one place of truth with that data, and every transformation should be done in a **selector**.

- Inside a component, you shouldn't transform a selector (using map operator), or you shouldn't have to call a selector from a function in your view. The useful data for a component should be done in a **selector**.

## Statement

##### You will have to

1.  Refactor this working exemple of a dashboard of activities.

##### Rules:

- Only **one action** should be dispatched from a component
- Status effect is useless. Using **combineLatest** should be a red flag. And Effect are made for side effect, not transforming data. That's a selector role
- Status state might not be useful, it's only a **derived state** of existing state.

## Submitting your work

1. Fork the project
2. clone it
3. npm install
4. **nx serve ngrx-1**
5. _...work On it_
6. Commit your work
7. Submit a PR that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A2+label%3Aanswer" target="_blank"><img src="https://img.shields.io/badge/-Solutions-green" alt="Projection"/></a>

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank"><img src="./../../logo/twitter.svg" height=20px alt="Projection"/></a>
