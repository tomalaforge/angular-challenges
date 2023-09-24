<h1>CRUD application with local store</h1>

> Author: Thomas Laforge

## Information

Communicating and having a global/local state in sync with your backend is the heart of any application. You will need to master those following best practises to build strong and reliable Angular Application.

## Statement

In this exercice, you have a small CRUD application, which get a list of TODOS, update and delete some todo.

Currently we have a working exemple but filled with lots of bad practices.

### Step 1: refactor with best practices

What you will need to do:

- Avoid **any** as a type. Using Interface to leverage Typescript type system prevent errors
- Use a **separate service** for all your http calls and use a **BehaviourSubject** for your todoList
- Use **AsyncPipe** to suscribe to your todo list. _(Let you handle subscription, unsuscription and refresh of the page when data has changed)_, avoir manual subscribe when it's not needed
- Don't **mutate** data

```typescript
// Avoid this
this.todos[todoUpdated.id - 1] = todoUpdated;

// Prefer something like this, but need to be improved because we still want the same order
this.todos = [...this.todos.filter((t) => t.id !== todoUpdated.id), todoUpdated];
```

- Use **ChangeDectection.OnPush**

### Step 2: Improve

- Add a **Delete** button: _<a href="https://jsonplaceholder.typicode.com/" target="_blank">Doc of fake API</a>_
- Handle **errors** correctly. _(Globaly)_
- Add a Global **loading** indicator. _You can use MatProgressSpinnerModule_

### Step 3: Maintainability!! add some test

- Add 2/3 tests

### Step 4: Awesomeness!!! master your state.

- Use the **component store of ngrx** as a local state of your component. _(or any other 3rd Party lib)_
- Have a **localize** Loading/Error indicator, e.g. only on the Todo being processed and **disable** all buttons of the processed Todo. _(Hint: you will need to create an ItemComponent)_

## Submitting your work

1. Fork the project
2. clone it
3. npm ci
4. **nx serve crud**
5. _...work On it_
6. Commit your work
7. Submit a PR with a title beginning with **Answer:5** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A5+label%3Aanswer" target="_blank"><img src="https://img.shields.io/badge/-Solutions-green" alt="Crud solution"/></a>
<a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A5+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="Crud solution author"/></a>
<a href="https://medium.com/@thomas.laforge/discover-the-power-of-ngrx-component-store-to-create-a-local-component-state-53e3a0af7970" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="Crud blog article"/></a>

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank"><img src="./../../logo/twitter.svg" height=20px alt="Twitter"/></a>
