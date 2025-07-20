---
title: Часто задаваемые вопросы
description: Ответы на вопросы
contributors:
  - stillst
sidebar:
  order: 7
---

<details>
  <summary>Почему мое приложение не запускается, или почему я вижу ошибки в терминале при запуске `nx serve`?</summary>

Чаще всего эта проблема возникает из-за того, что `node_modules` устарели, и вам нужно обновить их, выполнив команду `npm ci`.

Если установка завершилась неудачно, вы можете попробовать решить эту проблему, удалив папку `node_modules` с помощью команды `rm -rf node_modules` или `npx npkill`, а затем снова выполнить `npm ci`.

Если проблема сохранится, пожалуйста, сообщите о ней [тут](https://github.com/tomalaforge/angular-challenges/issues/new).

</details>
