---
title: 🟢 Default vs OnPush
description: El desafío 34 trata sobre aprender la diferencia entre las estrategias de detección de cambios Default y OnPush.
author: thomas-laforge
challengeNumber: 34
command: performance-default-onpush
sidebar:
  order: 7
---

## Información

En este desafío, exploraremos las diferencias e impactos de usar `ChangeDetectionStrategy.Default` versus `ChangeDetectionStrategy.OnPush`.

Puedes leer la [documentación de Angular](https://angular.io/guide/change-detection-skipping-subtrees) para aprender más sobre las diferencias entre estas estrategias.

En este desafío, todos los componentes comienzan con la estrategia `Default`. Cuando escribas letras dentro del campo de entrada, notarás que todos los componentes se resaltan en naranja.

:::note[Nota]
Agregué resaltado de color a cada componente y cada fila para proporcionar una mejor visualización de cuándo se vuelve a renderizar un componente.
:::

Como puedes ver, cada letra desencadena un nuevo ciclo de detección de cambios, y todos los componentes se vuelven a renderizar, lo que causa problemas de rendimiento.

Utilicemos la <b>Angular DevTool</b> para perfilar nuestra aplicación y comprender cómo esta herramienta puede ayudarnos a entender qué está sucediendo dentro de nuestra aplicación.

:::note[Nota]
Si no sabes cómo usarlo, lee primero [la página de introducción al rendimiento](/es/challenges/performance/) y vuelve después.
:::

Ahora, comienza a perfilar tu aplicación y escribe algunas letras dentro del campo de entrada para desencadenar algunos ciclos de detección de cambios.

Si haces clic en una de las barras (indicada por la flecha amarilla en la imagen a continuación), puedes ver que `PersonListComponent`, `RandomComponent` y todos los `MatListItem` se ven afectados por el ciclo de detección de cambios, incluso cuando solo interactuamos con el campo de entrada.

![profiler record](../../../../../assets/performance/34/profiler-record.png 'Registro del Profiler')

## Enunciado

El objetivo de este desafío es mejorar el agrupamiento de la detección de cambios dentro de la aplicación utilizando la estrategia de detección de cambios `OnPush`, pero no solo eso...

## Pistas:

<details>
  <summary>Pista 1</summary>

Utiliza `ChangeDetectionStrategy.OnPush`, pero esto no será suficiente.

</details>

<details>
  <summary>Pista 2</summary>

Crea componentes más pequeños para separar mejor el campo de entrada de la lista.

</details>
