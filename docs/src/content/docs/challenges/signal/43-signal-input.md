---
title: 🟢 Signal Input
description: Challenge 43 is about learning how to use signal inputs
author: thomas-laforge
contributors:
  - tomalaforge
challengeNumber: 43
command: signal-signal-input
sidebar:
  order: 16
---

## Information

Finally, the day has arrived when the Angular team introduces a reactive input. This highly requested feature has been awaited for many years. Version 17.1 introduces `SignalInput`. Instead of utilizing the well-known `@Input` decorator, you now have a function that returns a signal.

```ts
// old way
@Input() age?: number;

// new way
age = input<number>()
```

If you want required inputs

```ts
// old way
@Input({required: true}) age!: number;

// new way
age = input.required<number>()
```

If you wanted to obtain a signal from an input, you had to go through a setter to configure your signal from the input.

```ts
// old way
age = signal(0)
@Input({alias: 'age'}) set _age(age: number){
  this.age.set(age)
};

// new way
age = input<number>()
```

You can read more about signal inputs [here](https://angular.dev/guide/signals/inputs).

## Statement

In this small application, the goal is to refactor the `UserComponent` to utilize `SignalInput`.

- You have required and optional inputs.
- You can use the `transform` function for the `age` input to directly convert the property to a number.
