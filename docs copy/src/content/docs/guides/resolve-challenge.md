---
title: Resolve a Challenge
description: Guide to resolve a challenge
contributors:
  - tomalaforge
  - 1fbr
  - gsgonzalez88
sidebar:
  order: 2
---

In this guide, you will learn how to resolve a challenge and submit an answer to the main GitHub repository.

## Introduction

This repository is powered by [Nx](https://nx.dev/getting-started/intro). <b>Nx</b> is a monorepository that allows you to store multiple applications inside the same workspace. Each challenge is a separate application. If you open the `apps` directory, you will find multiple directories, each related to a specific challenge. Each directory represents a complete standalone `Nx` application. To run and start with one, open your terminal and run:

```bash
npx nx serve <APPLICATION_NAME>
```

:::note
If you are unsure of your `APPLICATION_NAME`, open the README.md file. The `serve` command is written there, with a link to the challenge documentation.
:::

:::note
If `nx` is installed globally on your device, you can skip using `npx`.

To install `nx` globally, run

```bash
npm i -g nx
```

:::

## Create a Git Branch

Before you start implementing your solution to resolve a challenge, create a git branch to commit your work.

```bash
git checkout -b <BRANCH_NAME>
```

## Resolve the Challenge

Follow the instructions to resolve the challenge.

## Commit and Push your Work

The last step is to commit your work following the [Conventional Guidelines](https://www.conventionalcommits.org/en/v1.0.0/).

Finally, push your work to the remote repository with the following command

```bash
    git push --set-upstream origin <BRANCH_NAME>
```

:::tip[Don't remember it]
You don't have to remember the command precisely. You just need to remember `git push` and if it's the first time you are pushing this branch, `git` will provide you with the complete command.
:::

## Submit your Work to the Main Repository

Now, all your work is located insite your local instance of the Angular Challenges repository.

The next step is to go to the main [Angular Challenges page](https://github.com/tomalaforge/angular-challenges) and create a new Pull Request.

GitHub should display a notification header to help you create the pull request.

If it's not the case, you either have done one of the previous steps incorrectly or you can go to the <b>Pull Request</b> tab and click the button <span class="github-success-btn">New pull request</span>.

Once you have chosen the two branches to compare, you should arrive on the following page:

![New pull request screen](../../../assets/new-pull-request.png)

In the title section, start with <b>Answer:</b> followed by your <b>challenge number</b>. After that, you are free to add anything you would like.

:::danger
This is very important. It lets others know which challenge you are attempting to resolve.
:::

In the description section, you can add questions, troubles you encountered, or anything else you want to share. You can leave it empty if you don't have anything to say.

You can now click on <span class="github-success-btn">Create pull request</span>.

## Get a review

To continue providing valuable feedback and reviews, <a href="https://github.com/sponsors/tomalaforge">support the project on Github</a>:

<ul>
<li>$5 per review</li>
<li>$25 for lifetime reviews</li>
<li>Create a challenge/Contribute for lifetime reviews</li>
</ul>

:::note
You should still submit your PR to join the list of answered challenges. And you can still be reviewed by a community member. 🔥

Everyone is welcome to comment and read other PRs. 💪
:::

:::tip[OSS champion]
🔥 Once you have completed this tutorial, you are ready to contribute to any other public GitHub repository and submit a PR. It is as easy as that. 🔥
:::
