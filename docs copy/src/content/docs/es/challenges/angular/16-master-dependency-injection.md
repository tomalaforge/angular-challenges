---
title: 🔴 Dominar la Inyección de Dependencias
description: El desafío 16 trata sobre dominar y entender como funciona la inyección de dependencias
author: thomas-laforge
contributors:
  - ErickRodrCodes
challengeNumber: 16
command: angular-master-dependency-injection
sidebar:
  order: 203
---

## Información

Para completar exitosamente este desafío, necesitarás tener un buen entendimiento de cómo funciona la Inyección de [Dependencias dentro](https://angular.dev/guide/di/dependency-injection) de Angular.

El objetivo es proporcionar en la tabla el `CurrencyService` a nivel de fila, para que cada fila muestre la moneda correcta. Actualmente, el `CurrencyService` solo se proporciona a nivel de tabla, lo que resulta en un error ya que se muestra la misma moneda en cada fila, a pesar de que cada producto tiene una moneda diferente.

Una forma de lograr esto es agregando un segundo argumento al pipe, pero esto no está permitido para este desafío.

## Declaración

- Tu tarea es mostrar la moneda correcta para cada fila.

## Restricciones

- No puedes modificar el pipe.
- No puedes envolver la fila dentro de un componente, ya que esto rompería el diseño.
