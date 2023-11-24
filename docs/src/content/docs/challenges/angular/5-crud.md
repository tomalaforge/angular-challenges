---
title: 🟢 Crud application
description: Challenge 5 is about refactoring a crud application
author: thomas-laforge
challengeNumber: 5
command: angular-crud
sidebar:
  order: 2
---

:::note
WIP: The following documentation will be reviewed and improved. However, you can still take on the challenge. If you don't understand a certain part, please feel free to reach out or create an issue.
:::

## Information

Communicating and having a global/local state in sync with your backend is the heart of any application. You will need to master these following best practises to build strong and reliable Angular Applications.

## Statement

In this exercice, you have a small CRUD application, which get a list of TODOS, update and delete some todos.

Currently we have a working example but filled with lots of bad practices.

### Step 1: refactor with best practices

What you will need to do:

- Avoid **any** as a type. Using Interface to leverage Typescript type system prevent errors
- Use a **separate service** for all your http calls and use a **BehaviourSubject** for your todoList
- Use **AsyncPipe** to subscribe to your todo list. _(Lets you handle subscription, unsubscription and refresh of the page when data has changed)_, avoid manual subscribe when it's not needed
- Don't **mutate** data

```typescript
// Avoid this
this.todos[todoUpdated.id - 1] = todoUpdated;

// Prefer something like this, but need to be improved because we still want the same order
this.todos = [...this.todos.filter((t) => t.id !== todoUpdated.id), todoUpdated];
```

- Use **ChangeDetection.OnPush**

### Step 2: Improve

- Add a **Delete** button: _<a href="https://jsonplaceholder.typicode.com/" target="_blank">Doc of fake API</a>_
- Handle **errors** correctly. _(Globally)_
- Add a Global **loading** indicator. _You can use MatProgressSpinnerModule_

### Step 3: Maintainability!! add some test

- Add 2/3 tests

### Step 4: Awesomeness!!! master your state.

- Use the **component store of ngrx** as a local state of your component. _(or any other 3rd Party lib)_
- Have a **localized** Loading/Error indicator, e.g. only on the Todo being processed and **disable** all buttons of the processed Todo. _(Hint: you will need to create an ItemComponent)_
