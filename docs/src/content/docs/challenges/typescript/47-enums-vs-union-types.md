---
title: 🟢 Enums vs Union Types
description: Challenge 47 is about the comparison between enums and union types
author: sven-brodny
contributors:
  - svenson95
  - jdegand
  - LMFinney
challengeNumber: 47
command: typescript-enums-vs-union-types
sidebar:
  order: 18
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

Enums are a concept borrowed from languages like C# and Java. TypeScript enums are compiled into JavaScript objects with keys for both the names and values of the enum members. This results in larger output files and additional memory consumption, which can be particularly problematic in performance-critical applications.

Enums have some more pitfalls as well:

- Non-const enums do not fit the concept of "a typed superset of JavaScript." They violate the concept by emitting global JavaScript objects that live in runtime with a syntax that is not compatible with JavaScript (JavaScript uses dynamic typing rather than static typing; enums are a form of static typing). Since JavaScript has no compilation step, there is little or no value in having static typing.
- Const enums, in contrast, cannot be transpiled with Babel. But there are workarounds for this issue, e.g., using the `babel-plugin-const-enum` plugin. The TypeScript documentation about [const enums](https://www.typescriptlang.org/docs/handbook/enums.html#const-enums) says "_Do not use const enums at all_".
- To use enums, you have to import them. If you want to use enum values in a template, you'll need to declare a variable in your component too.
- Numeric enums are not type safe ...

```typescript
enum Difficulty {
  EASY = 0,
  NORMAL = 1,
}
const hard: Difficulty = 2; // no error
```

### Reasons to use Enums

Enums are the best option for code maintainability. It is easy to find all usages of a value in a project and enforce constraints. If you stick to assigning strings to the enum keys all the time, you can avoid a lot of issues.

It's true that enums produce larger output files, but that's not always a real problem. As long as the enum does its job without any problems, it shouldn't be something you care that much about.

Another good thing is that the necessary enum prefixes add meaning to otherwise meaningless values, so they can improve readability. For example, `HttpStatus.Forbidden` gives more information than `Forbidden`.

### Mapped types

A [mapped type](https://learntypescript.dev/08/l2-mapped-type) is the process of creating a new type by mapping type information from an existing type.

```typescript
type Difficulty = { [K in 'EASY' | 'NORMAL']: string };
```

### Conclusion

Enums are not redundant, but in most cases, union types are preferred. Unless you care a lot about maintainability, enums may fit better. Here are some more interesting articles discussing this subject:

- [Should You Use Enums or Union Types in Typescript?](https://www.bam.tech/article/should-you-use-enums-or-union-types-in-typescript)
- [Typescript has unions, so are enums redundant?](https://stackoverflow.com/questions/40275832/typescript-has-unions-so-are-enums-redundant)
- [Tidy TypeScript: Prefer union types over enums](https://fettblog.eu/tidy-typescript-avoid-enums/)

## Statement

The goal of this challenge is to refactor the enums `Difficulty` and `Direction`.

- Refactor the `Difficulty` enum to **union type**.
- Refactor the `Direction` enum to **mapped type**.
