---
title: 🟢 De Módulo a Standalone (Independiente)
description: El desafío 31 trata sobre migrar una aplicación basada en módulos a una aplicación independiente.
author: thomas-laforge
contributors:
  - ErickRodrCodes
challengeNumber: 31
command: angular-module-to-standalone
sidebar:
  order: 6
---

## Información

En la versión 14 de Angular, se lanzaron los componentes standalone (o independientes, los cuales por traducción en español se hacen más fáciles de entender) y se estabilizaron en la versión 15. Si no has experimentado con ellos, nunca es tarde. Puedes probarlos en este desafío.

Además, el objetivo es ver cómo **Nx** y los **componentes independientes** trabajan juntos, y experimentar el proceso de desacoplar tu aplicación con la librería en Nx y componentes independientes.

Finalmente, los componentes independientes son muy simples de entender, pero los **componentes cargados con el método diferido routing/lazy-loaded** pueden ser un poco más difíciles de comprender. Este desafío te permitirá manipular componentes en diferentes niveles de anidación y trabajar con rutas de carga diferida.

Después de completar este desafío, los componentes independientes no tendrán más secretos para ti.

## Declaración

El objetivo de este desafío es migrar tu aplicación de componentes basados en módulos a componentes independientes.

## Nota

También puedes probar el [esquema de Angular](https://angular.dev/reference/migrations/standalone) para migrar NgModule a componentes independientes. _(Dado que estamos usando nx, comienza tu comando con nx en lugar de ng)_
