---
title: 查看某人的回答
description: 查看某人的回答指南
contributors:
  - tomalaforge
  - gsgonzalez88
  - 1fbr
  - jdegand
sidebar:
  order: 3
---

所有Angular Challenges的答案都将以pull request (PR)的形式呈现。要查看和跟踪它们，请浏览GitHub上的**文件更改**页面。但是，如果您不熟悉界面，理解和遵循此过程可能并不简单。在许多情况下，您可能更喜欢签出分支并在您首选的IDE中检查解决方案。

## 安装 GitHub CLI

在[这里](https://github.com/cli/cli#installation)按照操作系统的说明操作。

## 查看本地其他人的PR

### 同步存储库

首先，您需要同步您的分支，以确保它与分支存储库是最新的。

这可以通过点击你的分支主页上的**Sync fork**按钮来实现。

![Sync project header](../../../../assets/fork-sync.png)

上图显示我的分支落后于主分支 8 个提交，我需要将其同步才能保持最新。

![Sync project update modal](../../../../assets/sync-fork-update.png)

### 本地检出查看

导航到你想在本地查看的PR并获取其ID。你可以在PR的标题中找到它(如下所示)。

![PR header](../../../../assets/PR-header.png)

接下来，切换到项目目录中的任意终端，并运行以下命令:

```bash
gh pr checkout <ID>
```

如果你不记得这个命令，点击标题右侧的Code按钮，你可以轻松地复制/粘贴这个命令。

![PR code modal](../../../../assets/PR-code-btn-modal.png)

:::note[注意]
如果命令不起作用或失败，GitHub CLI会引导你完成整个过程。
:::

🔥您现在可以在本地浏览解决方案并提供服务以测试它。🔥

### 使用GitHub Codespaces检出查看

你可以使用GitHub Codespaces查看任何**打开**的PR。点击code按钮后，你可以导航到codespaces标签，然后点击绿色按钮，在PR的分支上创建一个codesace。codespace初始化后，就可以启动应用了。
