---
title: Create your own challenge
description: Guide to create your own challenge
sidebar:
  order: 5
---

You have an idea you want to share, an interesting bug you are struggling with in one of your private or side project, or an Angular trick you discovered. All of these possibilities are a good starting point to create a challenge and share the solution with others.

But how do you start creating these challenges?

## Boilerplate Setup

To streamline the process, I have created an Nx generator that will set up all the boilerplate for you and get you ready faster. The easiest way to run it is by using the Nx console: go to the <b>Nx Console > generate > @angular-challenges/cli - challenge</b>

### Parameters

#### mandatory parameters

- <b>title</b>: The title you want to give to your challenge.
  :::note
  The title must be a maximum of 25 characters.
  :::

- <b>challengeDifficulty</b>: The difficulty you think your challenge has. There are three difficulty levels : 🟢 easy / 🟠 medium / 🔴 hard
- <b>name</b>: name of the Nx application.
  :::note
  It must be written in **kebab-case**
  :::
- <b>docRepository</b>: The category of your Challenge: Nx, Angular, Angular Performance, Rxjs, NgRx, Typescript.

#### optional parameters

- <b>directory</b>: If you want your application to be located in a specific folder inside `apps`.
- <b>addTest</b>: If you want to add test configuration.

### What is created

- The generator will create all the files needed to have a new working application. All these files will be created inside `apps/${directory}/${name}`
- A Markdown file with the minimal setup will be created inside `docs/src/content/docs/challenges/${docRepository}`

## Challenge Creation

The only thing left to do is to create your challenge. 🚀

:::danger
Don't forget to update the docs to introduce your challenge and provide your instructions.
:::

It's your turn to act!!! 💪

## Solution Submittion

After one week or so, don't forget to provide your solution to your challenge.
