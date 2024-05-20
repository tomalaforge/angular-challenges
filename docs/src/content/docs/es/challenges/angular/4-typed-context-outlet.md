---
title: 🔴 ContextOutlet en forma de tipo
description: El desafío 4 se trata de tipificar de manera fuerte las directivas de ngContextOutlet
author: thomas-laforge
contributors:
  - ErickRodrCodes
challengeNumber: 4
command: angular-typed-context-outlet
blogLink: https://medium.com/@thomas.laforge/ngtemplateoutlet-type-checking-5d2dcb07a2c6
sidebar:
  order: 201
---

## Información

:::note[Nota]

Las declaraciones de tipos permanecerán en ingles, asi como los nombres de los objetos y sus miembros.

:::

Angular ofrece la function estática [`ngTemplateContextGuard`](https://angular.dev/guide/directives/structural-directives#improving-template-type-checking-for-custom-directives) para reforzar el tipo de una directiva estructural.

Sin embargo, el contexto de **NgTemplateOutlet** es de tipo **Object**. Con la ayuda de la guardia mencionada anteriormente, podemos mejorar ese comportamiento.

## Declaración

En este desafío, queremos aprender como reforzar el tipo de nuestro ng-template en AppComponent.

Este desafío ofrece dos niveles de complejidad:

### Nivel 1: una Interfase conocida

A continuación tenemos estas lineas de código:

![Any en Person](../../../../../assets/4/unknown-person.png)

Como se puede observar, "name" es de tipo "any". La meta es inferir el tipo correcto.

### Nivel 2: una Interfase genérica

Actualmente, tenemos estas lineas de código:

![Any en Student](../../../../../assets/4/unknown-student.png)

Como puede apreciarse, "student" es de tipo "any". Queremos inferir el tipo de manera correcta.

Pero en esta parte, podemos pasar a ListComponent, una lista de **cualquier cosa**. Aun asi, queremos inferir de manera correcta el tipo de dato.
