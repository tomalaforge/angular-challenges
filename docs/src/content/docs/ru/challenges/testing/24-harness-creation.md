---
title: 🟠 Создание harness класса
description: Задача 24 посвящено созданию компонента тестового стенда.
author: thomas-laforge
contributors:
  - Dinozavvvr
challengeNumber: 24
command: testing-harness-creation
sidebar:
  order: 112
---

## Информация

Цель этой задачи - реализовать harness класс для `slider.component.ts`. Файл стенда, `slider.harness.ts`, уже создан.

Необходимо реализовать следующее API:

```ts
  async clickPlus(): Promise<void> ;

  async clickMinus(): Promise<void>;

  async getValue(): Promise<number> ;

  async getMinValue(): Promise<number>;

  async disabled(): Promise<boolean>;

  async setValue(value: number): Promise<void>;
```

Кроме того, вы должны создать `HarnessPredicate` с предикатом по умолчанию и свойством `minValue`.

```ts
  static with<T extends MySliderHarness>(
    this: ComponentHarnessConstructor<T>,
    options: SliderHarnessFilters = {}
  ): HarnessPredicate<T>;
```

Наконец, вам нужно создать набор тестов для `app.component`. Некоторые тесты по умолчанию уже написаны, но не стесняйтесь добавлять столько тестов, сколько вам нужно, и создавать столько методов, сколько вам потребуется.

> Документация Angular Material доступна [здесь](https://material.angular.io/cdk/test-harnesses/overview).

Удачи !!! 💪
