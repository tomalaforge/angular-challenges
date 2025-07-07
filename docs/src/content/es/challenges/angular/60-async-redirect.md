---
title: 🟢 async-redirect
description: El desafío 60 trata sobre el uso de la nueva función `redirectTo` en Angular Router para modernizar la lógica de navegación.
author: thomas laforge
contributors:
  - tomalaforge
challengeNumber: 60
command: angular-async-redirect
sidebar:
  order: 23
  badge: New
---

## Enunciado

En este desafío, trabajas con una aplicación Angular que actualmente utiliza un método personalizado `navigate` en `dashboard.ts` para manejar los cambios de ruta. Con la introducción de la nueva función `redirectTo` en Angular Router en la versión 20, el objetivo es modernizar la base de código eliminando el antiguo método `navigate` y refactorizando la aplicación para usar `redirectTo` en toda la lógica de redirección.

Tu tarea es:

- Localizar y eliminar el método `navigate` en `dashboard.ts`.
- Refactorizar la aplicación para usar la nueva función `redirectTo` de Angular Router donde sea necesario realizar una navegación.

Esto ayudará a garantizar que la aplicación aproveche las últimas características de enrutamiento de Angular y mantenga las mejores prácticas para la navegación y redirección.
