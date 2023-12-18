---
title: 🟠 Pipe Wrapper para funciones
description: El desafío 9 trata sobre la creación de un tubo para envolver funciones de componentes
author: thomas-laforge
challengeNumber: 9
command: angular-pipe-intermediate
blogLink: https://medium.com/ngconf/boost-your-apps-performance-by-wrapping-your-functions-inside-a-pipe-7e889a901d1d
sidebar:
  order: 103
---

El objetivo de esta serie de 3 desafíos de pipes es dominar **pipe** en Angular.

Los pipes puros son una forma muy útil de transformar datos desde tu plantilla. La diferencia entre llamar a una función y un pipe es que los pipes puros son memorizados. Así que no serán recalculados en cada ciclo de detección de cambios si sus entradas no han cambiado.

## Información:

En este segundo ejercicio, estás llamando a múltiples funciones dentro de tu plantilla. Puedes crear un pipe específico para cada una de las funciones, pero esto sería demasiado engorroso.
El objetivo es crear un pipe `wrapFn` para envolver tu función de retorno a través de un pipe. Tu función DEBE permanecer dentro de tu componente. **`WrapFn` debe ser altamente reutilizable.**

## Restricciones:

- El tipo debe ser fuertemente definido.
