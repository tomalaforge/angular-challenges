---
title: 🟢 Optimización de NgFor
description: El Desafío 36 trata sobre como funciona trackby
author: thomas-laforge
challengeNumber: 36
command: performance-ngfor-optimize
sidebar:
  order: 13
---

## Información

En esta aplicación, tenemos una lista de individuos que podemos agregar, eliminar o actualizar. Si abres el panel de desarrollador de Chrome presionando **F12**, ve a la pestaña <b>source</b> y expande el elemento para ver la lista, notarás que cada vez que agregas, eliminas o actualizas un elemento de la lista, se destruyen y vuelven a inicializar todos los elementos del DOM. (Ver video a continuación).

<video controls src="https://github.com/tomalaforge/angular-challenges/assets/30832608/71b90307-3ee3-42c0-a532-b67ce4f20bf6">
</video>

También podemos usar la <b>Angular DevTool</b> para perfilar nuestra aplicación y entender qué está sucediendo dentro de ella. Te mostraré cómo hacerlo en el siguiente video.

<video controls src="https://github.com/tomalaforge/angular-challenges/assets/30832608/dd8108c6-1d89-4b05-9aa5-e760bd6f7f11">
</video>

:::note
Si no sabes cómo usarlo, lee primero [la página de introducción al rendimiento](/es/challenges/performance/) y vuelve después.
:::

Si necesitas más información sobre `NgFor`, te invito a leer primero la [documentación](https://angular.io/api/common/NgFor).

## Enunciado

El objetivo de este desafío es entender qué está causando esta actualización del DOM y solucionarlo.
