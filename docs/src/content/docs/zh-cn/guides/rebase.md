---
title: 变基分支
description: 将分支变基到最新更改的指南
contributors:
  - tomalaforge
sidebar:
  order: 6
---

有时，可能会向项目添加更改。我会尝试做出不会破坏任何东西的更改，但有时这是不可避免的。

大多数情况下，您不需要变基您的解决方案，但这里有一个指南可以帮助您知道如何操作。

:::note[注意]
本指南适用于任何开源项目。
:::

## 变基分支的步骤

### 同步存储库

首先，你需要同步你的分支，以确保它与分支的存储库是最新的。

你可以通过点击你的fork主页面上的Sync fork按钮来实现这一点。

![Sync project header](../../../../assets/fork-sync.png)

上图显示我的分支比主分支落后 8 个提交，我需要将其同步才能保持最新。

![Sync project update modal](../../../../assets/sync-fork-update.png)

### 打开终端

打开您选择的任何终端，可以是您最喜欢的 IDE 中的终端，也可以是独立实例。

### Git

请按照以下命令重新设置本地分支的基础：

- git checkout main
- git pull
- git checkout [你的分支]
- git rebase main
- 解决冲突

在此步骤中，变基可能会停止，因为您的本地分支与主分支有冲突的文件。纠正它们。完成此操作后:

- git add .
- git rebase --continue

如果您的分支没有任何冲突，则会显示成功消息。

### 将你的工作推送到远程分支

最后，将你的工作推送到GitHub:

- git push -f
