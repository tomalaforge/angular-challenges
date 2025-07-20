---
title: 🔴 Типизация ContextOutlet
description: Испытание 4 про строгую типизацию ngContextOutlet директивы
author: thomas-laforge
contributors:
  - stillst
challengeNumber: 4
command: angular-typed-context-outlet
blogLink: https://medium.com/@thomas.laforge/ngtemplateoutlet-type-checking-5d2dcb07a2c6
sidebar:
  order: 201
---

## Информация

В Angular есть статическая функция [`ngTemplateContextGuard`](https://angular.dev/guide/directives/structural-directives#improving-template-type-checking-for-custom-directives) для строгой типизации структурных директив.

Однако, контекстом **NgTemplateOutlet** является **Object**. Но с помощью вышеупомянутой гарда, мы можем улучшить это поведение.

## Пояснение

В этом испытании, мы хотим научиться строго типизировать ng-template в AppComponent.

Это упражнение имеет два уровня сложности:

### Уровень 1: Известный интерфейс

Сейчас код выглядит следующим образом.

![Unkown Person](../../../../../assets/4/unknown-person.png 'Unkown Person')

Как мы видим, у переменной name тип "any". Мы хотим вывести правильный тип.

### Уровень 2: Обобщённый интерфейс

Сейчас код выглядит следующим образом.

![Unkown Student](../../../../../assets/4/unknown-student.png 'Unkown Student')

Как мы видим, у переменной student тип "any". Мы хотим вывести правильный тип.

Но на этот раз, мы хотим передавать в `ListComponent` список из любых объектов. И мы все равно хотим, чтобы был выведен правильный тип.
