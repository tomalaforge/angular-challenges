# Angular Exercice 2 : NgRx

Second exercice of a series of Angular exercices. The goal is to improve our angular skills all together.

---

For this second exercice, we will deep dive inside **NgRx**.

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
4. ng serve
5. ...Work On it
6. Commit your work
7. Submit a PR that I will review and other dev can review.

_You can ask any question on Twitter or on Github_
