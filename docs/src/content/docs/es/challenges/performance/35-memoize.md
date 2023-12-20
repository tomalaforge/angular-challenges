---
title: 🟢 Memoización
description: El desafío 35 trata sobre cómo funcionan las tuberías puras
author: thomas-laforge
challengeNumber: 35
command: performance-memoized
sidebar:
  order: 8
---

<div class="chip">Desafío #35</div>

## Información

En Angular, los <b>pure pipes</b> son muy poderosas porque el valor se memoiza, lo que significa que si el valor de entrada no cambia, la función `transform` del pipe no se vuelve a calcular y se emite el valor en caché.

Puedes aprender más sobre pipes en la [documentación de Angular](https://angular.io/guide/pipes) y en este [artículo de inmersión profunda](https://medium.com/ngconf/deep-dive-into-angular-pipes-c040588cd15d).

En este desafío, comenzamos con un botón para cargar una lista de personas. Cada persona está asociada con un número y utilizaremos el cálculo de Fibonacci para crear una computación pesada que ralentizará la aplicación.

Una vez que se carga la lista, intenta escribir algunas letras dentro del campo de entrada. Te darás cuenta de que la aplicación es muy lenta, a pesar de que solo estás realizando una escritura muy básica.

:::note[Nota]
No nos centraremos en la carga inicial de la lista en este desafío.
:::

Utilicemos la <b>Angular DevTool</b> para perfilar nuestra aplicación y comprender cómo esta herramienta puede ayudarnos a entender qué está sucediendo dentro de nuestra aplicación.

:::note[Nota]
Si no sabes cómo usarlo, lee primero [la página de introducción al rendimiento](/es/challenges/performance/) y vuelve después.
:::

Ahora, comienza a perfilar tu aplicación y escribe algunas letras dentro del campo de entrada. Verás que aparecen algunas barras rojas en el panel del perfilador.

Si haces clic en una de las barras (indicada por la flecha amarilla en la imagen a continuación), verás que el ciclo de detección de cambios está tardando más de 3 segundos en `PersonListComponent`.

![profiler record](../../../../../assets/performance/35/memoize-profiler.png 'Registro del perfilador')

## Enunciado

El objetivo de este desafío es comprender qué está causando esta latencia y mejorarla.

## Pistas:

<details>
  <summary>Pista 1</summary>

Utiliza `Pipes` para memoizar el cálculo de Fibonacci.

</details>
