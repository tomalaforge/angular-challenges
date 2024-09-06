---
title: 常见问题解答
description: 回答问题
contributors:
  - tomalaforge
  - jdegand
sidebar:
  order: 7
---

<details>
  <summary>
    为什么我的应用程序没有启动，或者为什么我在运行`nx serve`时在终端中遇到错误?
  </summary>
  
  大多数情况下，出现这个问题是因为你的node_modules已经过时了，你需要通过运行 `npm ci` 来更新它们。

如果安装失败，可以通过 `rm -rf node_modules` 或 `npx npkill` 删除node_modules文件夹，然后重新运行 `npm ci` 来解决。

如果问题仍然存在，请在[这里](https://github.com/tomalaforge/angular-challenges/issues/new)报告问题。

</details>
