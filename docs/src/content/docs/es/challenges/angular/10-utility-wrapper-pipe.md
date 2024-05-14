---
title: 🔴 Pipe Wrapper para utilidades
description: El desafío 10 trata sobre la creación de un pipe para envolver utilidades
author: thomas-laforge
contributors:
  - ErickRodrCodes
challengeNumber: 10
command: angular-utility-wrapper-pipe
sidebar:
  order: 202
---

El objetivo de esta serie de 3 desafíos de pipes es dominar **pipe** en Angular.

Los pipes puros son una forma muy útil de transformar datos desde tu plantilla. La diferencia entre llamar a una función y un pipe es que los pipes puros son memorizados. Así que no serán recalculados en cada ciclo de detección de cambios si sus entradas no han cambiado.

## Información:

En este tercer ejercicio, quieres acceder a funciones de utilidades. Actualmente no puedes acceder a ellas directamente desde tu plantilla. El objetivo es crear un pipe específico para este archivo de utilidades donde necesitarás pasar el nombre de la función que quieres llamar y los argumentos necesarios.

## Restricciones:

- El tipo debe ser fuertemente definido.
