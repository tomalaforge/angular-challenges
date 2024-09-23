---
title: 创建你自己的挑战
description: 创建你自己的挑战指南
contributors:
  - tomalaforge
  - gsgonzalez88
  - jdegand
sidebar:
  order: 5
---

你有一个想法想要分享，你正在努力解决某个私人项目或业余项目中的一个有趣的bug，或者你发现的一个Angular技巧。所有这些可能性都是创建挑战并与他人分享解决方案的良好起点。

如何开始创造这些挑战?

## 样板设置

为了简化这个过程，我创建了一个Nx生成器，它将为您设置所有样板文件。运行它最简单的方法是使用Nx控制台:转到<b>Nx Console > generate > @angular-challenges/cli - challenge</b>。

或者，你也可以利用IDE的 [Nx Console extension](https://nx.dev/getting-started/editor-setup)来生成文件

### 参数

#### 强制参数

- <b>title</b>: 你想给你的挑战的标题。
  :::note[注意]
  标题长度不能超过25个字符。
  :::

- <b>author</b>: 你的名字

  :::note[注意]
  你的名字应该使用烤肉串格式(如： john-doe)
  :::

  :::note[注意]
  别忘了在以你名字命名的文件中更新你的个人信息
  :::

- <b>challengeDifficulty</b>:你认为你的挑战有多大的难度。有三个难度级别:🟢简单/🟠中等/🔴困难

- <b>docRepository</b>: 你挑战的类别是Nx、Angular、Angular性能、Rxjs、NgRx、Typescript、表单或信号。

#### 可选参数

- <b>challengeNumber</b>: 当有挑战提交时，可以指定挑战号。(如果为空，该数字将是下一个数字)。
- <b>directory</b>: 如果您希望您的应用程序位于 `apps` 中的特定文件夹中。
- <b>addTest</b>: 如果您想添加测试配置。

### 创建了什么?

- 生成器将创建新应用程序运行所需的所有文件。所有这些文件都将创建在 `apps/${directory}/${name}` 中
- 将在 `docs/src/content/docs/challenges/${docRepository}` 中创建一个带有最小设置的Markdown文件。

## 创造挑战

剩下唯一要做的就是创造挑战。 🚀

:::danger[危险]
不要忘记更新文档以介绍您的挑战并提供说明。
:::

轮到你行动了!!💪

## 解决方案提交

大约一周后，提供一个针对您的挑战的解决方案的pull request。
