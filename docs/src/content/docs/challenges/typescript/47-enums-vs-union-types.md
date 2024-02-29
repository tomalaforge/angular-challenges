---
title: 🟢 Enums vs Union Types
description: Challenge 47 is about the comparison between enums and union types
author: sven-brodny
challengeNumber: 47
command: typescript-enums-vs-union-types
sidebar:
  order: 18
  badge: New
---

## Information

[Enums](https://www.typescriptlang.org/docs/handbook/enums.html) allow developers to define a set of named constants that represent a specific type. TypeScript provides both numeric and string-based enums.

```typescript
enum Difficulty {
  EASY = 'EASY',
  NORMAL = 'NORMAL',
}
```

On the other hand, [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) are simpler than enums, as they don't require any additional runtime or compilation overhead.

```typescript
type Difficulty = 'EASY' | 'NORMAL';
```

### Reasons to use Union Types

Enums are a concept borrowed from languages like C# and Java. TypeScript Enums are compiled into JavaScript objects with keys for both the names and values of the Enum members. This results in larger output files and additional memory consumption, which can be particularly problematic in performance-critical applications.

Enums have some more pitfalls as well:

- Non-const enums do not fit to the concept "a typed superset of JavaScript". They violate the concept by emitting JavaScript objects that live in runtime with a syntax that is not compatible with JavaScript.
- Const enums in contrast cannot be transpiled with Babel. But there are workarounds for this issue, e. g. using `babel-plugin-const-enum` plugin.
- To use enums you have to import them, if you want to use enum values in a template, you'll need to declare a variable in your component too.
- Numeric enums are not type safe ...

```typescript
enum Difficulty {
  EASY = 0,
  NORMAL = 1,
}
const hard: Difficulty = 2; // no error
```

### Reasons to use Enums

With an enum, it is much easier to find all usages of a value in a project, thus refactoring & maintaining is extremly easy. If you stick to assigning strings to the enum keys all the time, you can avoid a lot of issues.

Another good thing is that they add meaning to otherwise meaningless values, so they can improve readability. For example `HttpStatus.Forbidden` gives more information than `Forbidden`.

### Conclusion

Enums are not redundant, but in most cases union types are preferred. Unless you care a lot about maintainability, where Enums maybe fit a little bit better. Here are some more interesing articles discussing this subject:

- [Should You Use Enums or Union Types in Typescript?](https://www.bam.tech/article/should-you-use-enums-or-union-types-in-typescript)
- [Typescript has unions, so are enums redundant?](https://stackoverflow.com/questions/40275832/typescript-has-unions-so-are-enums-redundant)
- [Tidy TypeScript: Prefer union types over enums](https://fettblog.eu/tidy-typescript-avoid-enums/)

## Statement

The goal of this challenge is to refactor the enums `Difficulty` & `Direction`.

- Refactor `Difficulty` to const enum.
- Refactor `Direction` to union type.
