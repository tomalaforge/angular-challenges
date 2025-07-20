---
title: 🟢 Harness
description: Задача 23 посвящена тестированию с использованием harness компонентов
author: thomas-laforge
contributors:
  - webbomj
challengeNumber: 23
command: testing-harness
sidebar:
  order: 9
---

## Информация

Harness это класс, который позволяет тесту взаимодействовать с компонентом через поддерживаемый API.

Цель этого задания - лучше понять CDK test harness API. В этом первоначальном задании мы будем использовать только встроенные harness Angular Material.

Документация для harness компонентов CDK находится [здесь](https://material.angular.io/cdk/test-harnesses/overview#api-for-test-authors).
Документация для компонента Angular Material находится [здесь](https://material.angular.io/components/button/overview).

## Пояснение

Протестируйте функциональность `child.component.ts`, которая состоит из некоторых inputs & checkboxes, связанных с `mat-slider`. Реализуйте подготовленный набор тестов, но не стесняйтесь также включать дополнительные тесты.

**Заметка:** Вы можете воспользоваться Testing Library, если хотите.
