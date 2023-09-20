---
title: Resolve a Challenge
description: Guide to resolve a challenge
sidebar:
  order: 2
---

In this guide, you will learn how to resolve a challenge and submit an answer to the main Github repository.

## Presentation

This repository is powered by [Nx](https://nx.dev/getting-started/intro). **Nx** is a monorepository allowing to store multiple application inside the same workspace. That's said, each challenges is a separate application. If you open the `apps` directory, you will found multiple directory all related to one challenge. Each directory is a complete standalone `Nx` application. To run and start with one, open your terminal and run

```bash
npx nx serve <APPLICATION_NAME>
```

:::note
If you are not sure of your APPLICATION_NAME, open the README.md file. The `serve` command is written inside with a link to the documentation challenge.
:::

:::note
If `nx` is installed globally on your device, you can avoid using `npx`.

If you want to install `nx` globally, run

```bash
npm i -g nx
```

:::

## Create a git branch

Before starting implementing your own solution to resolve a challenge, create a git branch to commit your work.

```bash
git checkout -b <BRANCH_NAME>
```

## Resolve the challenge

Resolve the challenge following the instruction

## Commit and Push your work

Last step is to commit your work following the [Conventional Guidelines](https://www.conventionalcommits.org/en/v1.0.0/).

Finaly, push your work to the remote reposository with the following command

```bash
    git push --set-upstream origin <BRANCH_NAME>
```

:::tip[Don't remember it]
You don't have to remember the command precisely. You just need to remember `git push` and if it's the first time you are pushing this branch, `git` will give you the complete command.
:::

## Submit your work to the main repository

Now, all your work is located insite your local instance of the Angular Challenge repository.

Next step is to go to the main [Angular Challenge page](https://github.com/tomalaforge/angular-challenges) and create a new Pull Request.

Github should pop a notification header to help you create that pull request.

If it's not the case, you either have done one of the previous step wrong or you can go to the **Pull Request** tab and click the button <span class="github-success-btn">New pull request</span>.

Once you have choosen the two branches to compare, you should arrive on the following page:

![New pull request screen](../../../assets/new-pull-request.png)

Inside the title section, you should start with **Answer:** following by your **challenge number**, after that you are free to add anything you would like.

:::danger
This is very important. It lets other know what challenge you are trying to resolve
:::

Inside the description section, you can add questions, troubles you add or anything you want to share. You can leave it empty if you don't have anything to say.

You can now click on <span class="github-success-btn">Create pull request</span>.

I will read and comment on it when I have some free time.

:::note
Anybody is welcomed to comment and read other PR.
:::

:::tip[OSS champion]
🔥 Once you have completed this tutorial once, you are ready to go inside any other public github repository and submit a PR. It is as easy as that. 🔥
:::
