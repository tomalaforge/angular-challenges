# Race Condition

### Как запускать

```bash
npm run serve:rxjs-race-condition
```

## Документация
---
title: 🟢 Состояние гонки
description: Задача 14 посвящена race condition в Rxjs
author: thomas-laforge
contributors:
  - webbomj
challengeNumber: 14
command: rxjs-race-condition
sidebar:
  order: 11
---

## Информация

Цель этого приложения - отображать список тем в модальном режиме при нажатии кнопки. Приложение функционирует корректно. Однако ваш технический руководитель попросил вас добавить тесты, и они завершились неудачей.

## Пояснение

Исправьте своё приложение, чтобы пройти тест

## Ограничения:

- Я вижу, как ты приближаешься 🤣 => Вы НЕ МОЖЕТЕ изменить тест (тест работает нормально) 😳
- Вы НЕ МОЖЕТЕ изменить `fakeGetHttpTopic` метод. Добавлена задержка, чтобы имитировать медленную сеть.

## Запуск тестов

HEADLESS : `npx nx component-test rxjs-race-condition`
WATCH MODE : `npx nx component-test rxjs-race-condition --watch`
