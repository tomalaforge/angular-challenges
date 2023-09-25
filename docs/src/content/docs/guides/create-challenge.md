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

title: string;
challengeDifficulty: string;
docRepository: string;
name: string;
directory?: string;
addTest?: boolean;

This generator will create a new application inside the `apps` directory and a Markdown file inside the `docs` folder.
