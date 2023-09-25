---
title: Create your own challenge
description: Guide to create your own challenge
sidebar:
  order: 5
---

:::note
WIP: doc in writting
:::

You have an idea you want to share, an interesting bug you struggling on in your private organization or in your side project, an Angular trick you discovered,... All those possibilities are a good start to create a challenge and share the solution with others.

But how to start creating that challenges ?

## Boilerplate Setup

To ease the process, I created a Nx generator that will create all the boilerplate for you and get you ready faster. The easiest way to run it is by using the Nx console > generate > @angular-challenges/cli - challenge

### Parameters

#### mandatory parameters

- <b>title</b>: The title you want to give to your challenge.
  :::note
  Title length must be 25 characters maximum
  :::

- <b>challengeDifficulty</b>: The difficulty you think your challenge is. There is 3 difficulties : 🟢 easy / 🟠 medium / 🔴 hard
- <b>name</b>: name of the `apps` repository
  :::note
  It must be written in **Kebab-Case**
  :::
- <b>docRepository</b>: The category of your Challenge: Nx, Angular, Angular Performance, Rxjs, NgRx, Typescript.

#### optinal parameters

- <b>directory</b>: If you want your application to be located in a specific folder inside `apps`.
- <b>addTest</b>: If you want to add test configuration.

### What is created

- The generator will create all files needed to have a new working application. All these files will be created inside `apps/${directory}/${name}`
- A Markdown file with the minimal setup will be created inside `docs/src/content/docs/challenges/${docRepository}`

## Challenge Creation

The only thing left to do is to create your challenge. 🚀

:::danger
Don't forget to update the docs to introduce your challenge and give your instructions.
:::
