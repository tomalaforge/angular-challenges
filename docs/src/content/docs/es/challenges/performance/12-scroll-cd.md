---
title: 🟠 Optimizar el Change Detection al desplazarse
description: Desafío 12 sobre la optimización del número de ciclos de detección de cambios al desplazarse
author: thomas-laforge
challengeNumber: 12
command: performance-scroll-cd
sidebar:
  order: 107
---

## Información

En Angular, hay una biblioteca llamada <b>Zone.js</b> que realiza mucha magia para simplificar la vida del desarrollador. Zone.js parchea todos los eventos del DOM para que vuelva a verificar y volver a renderizar la vista cuando algo ha cambiado dentro de la aplicación. El desarrollador no tiene que activar manualmente la detección de cambios.

Sin embargo, a veces Zone.js activa mucha más detección de cambios de la necesaria. Por ejemplo, cuando se está escuchando un evento de desplazamiento, cada evento de desplazamiento generará un nuevo ciclo de detección de cambios.

En este desafío, solo necesitamos actualizar la vista en una posición de desplazamiento específica para mostrar u ocultar un botón. Todos los demás ciclos son innecesarios.

Para tener una mejor visualización del problema, perfila tu aplicación con Angular Dev Tools.

:::note
Si no sabes cómo usarlo, lee [la página de introducción al rendimiento](/es/challenges/performance/) primero y vuelve después.
:::

Puedes obtener más detalles sobre la contaminación de la zona y cómo resolverla [aquí](https://angular.io/guide/change-detection-zone-pollution).

El siguiente video explicará más a fondo el problema de esta aplicación.

<video controls src="https://user-images.githubusercontent.com/30832608/209819211-58d9ddcf-e1ad-4a78-8a7a-2be9d729e3f1.mov">
</video>

## Enunciado

Tu objetivo para este desafío es evitar todos los ciclos de detección de cambios innecesarios y activar una detección de cambios solo cuando sea necesario.

## Restricción:

No puedes optar por no usar Zone.js globalmente. Si este código forma parte de un proyecto grande y optas por no usar Zone.js, sin duda romperás tu aplicación.
