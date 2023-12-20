---
title: 🟠 InjectionToken
description: Desafio de Angular 39 para aprender sobre el poder del InjectionToken
author: thomas-laforge
challengeNumber: 39
command: angular-injection-token
sidebar:
  order: 118
  badge: New
---

## Información

En esta pequeña aplicación, comenzamos con un `VideoComponent` que contiene un timer de **1 segundo**. El equipo de desarrollo decidió usar una constante global para almacenar el valor del temporizador: `DEFAULT_TIMER`. Sin embargo, unas semanas más tarde, el equipo de producto quiere agregar una nueva pantalla para llamadas telefónicas llamada `PhoneComponent`, y queremos reutilizar el `TimerComponent`. Sin embargo, el equipo de producto quiere un temporizador de **2 segundos**. ¿Cómo podemos lograr esto?

## Enunciado

Actualmente, el temporizador sigue siendo de 1 segundo para el `PhoneComponent`. El objetivo de este desafío es cambiar el valor del temporizador a 2 segundos para el `PhoneComponent`.

## Restricciones

Se prohíbe el uso de `@Input`. Este ejemplo es básico, y el uso de `@Input` podría ser una buena opción, pero en aplicaciones más complejas, el componente que necesitamos actualizar puede estar profundamente anidado, lo que hace que el uso de `@Input` sea un diseño realmente malo.

## Pista

<details>
  <summary>Pista 1</summary>

Mirar este [blog post](https://itnext.io/stop-being-scared-of-injectiontokens-ab22f72f0fe9) puede ser de gran ayuda.

</details>
