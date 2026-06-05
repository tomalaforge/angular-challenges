# @RouterInput()

### Как запускать

```bash
npm run serve:angular-router-input
```

## Документация
---
title: 🟢 @RouterInput()
description: Задача 22 заключается в использовании декоратора @Input для получения параметров маршрутизатора.
author: thomas-laforge
contributors:
  - webbomj
challengeNumber: 22
command: angular-router-input
blogLink: https://medium.com/ngconf/accessing-route-params-in-angular-1f8e12770617
sidebar:
  order: 5
---

## Информация

В этом приложении мы извлекаем три фрагмента информации внутри нашего `TestComponent`, предоставленного маршрутизатором:

- Мы хотим получить `testId` найденный внутри параметров URL.
- Мы хотим получить `user` расположенный в параметрах запроса URL.
- Мы хотим получить доступ к `permission`, установленному внутри объекта `data` маршрута.

В Angular версиях 15 или более ранних мы используем `ActivatedRoute` для получения всей этой информации и получаем их через observables для прослушивания изменений URL.

В версии 16 Angular представил новый `Input`, который может прослушивать данные маршрута. Вы можете прочитать больше об этом [здесь](https://medium.com/ngconf/accessing-route-params-in-angular-1f8e12770617).

## Пояснение

Целью этого упражнения является рефакторинг кода для использования новой стратегии `RouterInput`.
