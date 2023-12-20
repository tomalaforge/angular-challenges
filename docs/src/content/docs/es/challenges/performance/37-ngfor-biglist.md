---
title: 🟠 Optimizando una lista larga
description: El desafio 37 trata sobre como optimizar una lista grande de elementos
author: thomas-laforge
challengeNumber: 37
command: performance-ngfor-biglist
sidebar:
  order: 117
---

## Información

En esta aplicación, renderizaremos una lista de 100,000 individuos al hacer clic en el botón loadList. Si abres el panel de desarrollo de Chrome presionando F12, ve al ícono de <b>Fuente</b> y expande el elemento para ver la lista, notarás que los 100,000 elementos se renderizan en el DOM, aunque solo podemos ver alrededor de 20 elementos en el área visible. Este proceso lleva mucho tiempo, por lo que la aplicación es muy lenta al mostrar la lista.

Podemos utilizar la <b>Herramienta de Desarrollo de Angular</b> para perfilar nuestra aplicación y entender lo que está sucediendo en su interior. Te mostraré cómo hacerlo en el siguiente video.

<video controls src="https://github.com/tomalaforge/angular-challenges/assets/30832608/713403fa-2eda-49d5-a7c9-acdef8aacd34">
</video>
:::[nota]
Si no sabes cómo usarlo, lee la página de introducción al rendimiento primero y regresa después.
:::

Enunciado
El objetivo de este desafío es implementar una alternativa mejor para mostrar una lista grande de elementos.

Pistas:

<details>
  <summary>Pista 1</summary>
Si no estás seguro por dónde empezar, te recomiendo leer la documentación de virtualización de Angular CDK.

</details>
