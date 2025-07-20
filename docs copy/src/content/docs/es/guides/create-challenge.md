---
title: Crea tu propio desafío
description: Guía para crear un desafío
contributors:
  - nelsongutidev
sidebar:
  order: 5
---

Tienes una idea que quieres compartir, un error interesante con el que estás luchando en uno de tus proyectos privados o secundarios, o un tip de Angular que descubriste. Todas estas posibilidades son un buen punto de partida para crear un desafío y compartir la solución con los demás.

Pero, ¿cómo empiezas a crear estos desafíos?

## Configuración de Plantillas (Boilerplate)

Para agilizar el proceso, he creado un generador Nx que configurará todo el boilerplate por ti y te preparará más rápido. La forma más sencilla de ejecutarlo es utilizando la consola Nx: ve a <b>Nx Console > generate > @angular-challenges/cli - challenge</b>

### Parámetros

#### parámetros obligatorios

- <b>title</b>: El título que quieres darle a tu desafío.
  :::note[Nota]
  El título debe tener un máximo de 25 caracteres.
  :::

- <b>challengeDifficulty</b>: La dificultad que crees que tiene tu desafío. Hay tres niveles de dificultad: 🟢 fácil / 🟠 medio / 🔴 difícil

- <b>name</b>: nombre de la aplicación Nx.
  :::note[Nota]
  Debe escribirse en **kebab-case**
  :::

- <b>docRepository</b>: La categoría de tu Desafío: Nx, Angular, Angular Performance, Rxjs, NgRx, Typescript.

#### parámetros opcionales

- <b>directory</b>: Si quieres que tu aplicación se encuentre en una carpeta específica dentro de `apps`.

- <b>addTest</b>: Si quieres agregar configuración de pruebas.

### Qué se crea

- El generador creará todos los archivos necesarios para tener una nueva aplicación de trabajo. Todos estos archivos se crearán dentro de `apps/${directory}/${name}`

- Se creará un archivo Markdown con la configuración mínima dentro de `docs/src/content/docs/challenges/${docRepository}`

## Creación del Desafío

Lo único que queda por hacer es crear tu desafío. 🚀

:::danger[Importante]

No olvides actualizar la documentación para presentar tu desafío y proporcionar tus instrucciones.

:::

¡Es tu turno de actuar! 💪

## Envío de la Solución

Después de una semana más o menos, no olvides proporcionar tu solución a tu desafío.
