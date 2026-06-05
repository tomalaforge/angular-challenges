# Projection

### Как запускать

```bash
npm run serve:angular-projection
```

## Документация
---
title: 🟢 Проекция контента
description: Challenge 1 заключается в изучении проекции элементов DOM через компоненты
author: thomas-laforge
contributors:
  - stillst
challengeNumber: 1
command: angular-projection
blogLink: https://medium.com/@thomas.laforge/create-a-highly-customizable-component-cc3a9805e4c5
videoLinks:
  - link: https://www.youtube.com/watch?v=npyEyUZxoIw&ab_channel=ArthurLannelucq
    alt: Projection video by Arthur Lannelucq
    flag: FR
  - link: https://www.youtube.com/watch?v=yNrfvu7vTa4
    alt: Projection video by Amos Lucian Isaila
    flag: ES
sidebar:
  order: 1
---

## Информация

Проекция контента в Angular - это мощная техника для создания компонентов с гибко настраиваемым внешним видом. Понимание и использование концепций <b>ng-content</b> и <b>ngTemplateOutlet</b> может значительно вам помочь создавать компоненты, предназначенные для повторного использования.

[Здесь](https://angular.dev/guide/components/content-projection) вы можете изучить все о <b>ng-content</b>, начиная с простых примеров и до более сложных.

Документацию <b>ngTemplateOutlet</b>t, вместе с базовыми примерами, можно найти [тут](https://angular.dev/api/common/NgTemplateOutlet).

Имея эти два инструмента в своем распоряжении, вы теперь готовы пройти испытание.

## Пояснение

Вы начнете с полностью работающего приложения, которое включает панель с карточкой учителя и карточкой студента. Цель состоит в том, чтобы реализовать карточку города.

Хотя приложение работает, его внутреннее устройство далеко от идеала. Каждый раз, когда вам нужно реализовать новую карточку, вам придется изменять `card.component.ts`. В реальных проектах этот компонент может использоваться во многих приложениях. Цель этого упражнения создать `CardComponent`, внешний вид которого можно настроить без каких-либо изменений. После того как вы создадите этот компонент, вы можете создать `CityCardComponent` без модификации `CardComponent`.

## Ограничения

- Вы <b>должны</b> провести рефакторинг `CardComponent` и `ListItemComponent`.
- Директива `NgFor` должна быть определена и должна оставаться внутри `CardComponent`, несмотря на возможное желание перенести её в `ParentCardComponent`,как это сделано в `TeacherCardComponent`.
- `CardComponent` не должен содержать `NgIf` или `NgSwitch`.
- CSS: избегайте использования `::ng-deep`. Ищите альтернативные способы стилизации с помощью CSS.

## Дополнительные задачи

- Попробуйте использовать новый синтаксис для циклов и условий (документация [тут](https://angular.dev/guide/templates/control-flow)).
- Используйте signal API для управления состоянием компонентов (документация [тут](https://angular.dev/guide/signals)).
- Для ссылки на шаблон используйте директивы вместо магических строк ([What is wrong with magic strings?](https://softwareengineering.stackexchange.com/a/365344)).
