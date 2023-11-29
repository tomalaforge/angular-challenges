---
title: 🟢 @RouterInput()
description: El desafío 22 trata sobre el uso del decorador @Input para utilizar parámetros del router.
author: thomas-laforge
challengeNumber: 22
command: angular-router-input
blogLink: https://medium.com/ngconf/accessing-route-params-in-angular-1f8e12770617
sidebar:
  order: 5
---

## Información

En esta aplicación, tomaremos tres pedazos de información dentro de nuestro `TestComponent` proporcionadas por el router:

- Queremos obtener el `testId` que tenemos como parte de los parámetros de la URL.
- Queremos obtener `user` ubicado dentro de los parámetros de consulta (query params) de la URL.
- Queremos acceder a `permission` establecido dentro del objeto `data` de la ruta.

En las versiones 15 o anteriores de Angular, usamos `ActivatedRoute` para obtener toda esta información y recibirla a través de observables para escuchar los cambios de URL.

En la versión 16, Angular introdujo un nuevo `Input` que puede 'escuchar' los datos de la ruta. Puedes leer más al respecto [aquí](https://medium.com/ngconf/accessing-route-params-in-angular-1f8e12770617).

## Declaración

El objetivo de este ejercicio es refactorizar el código para usar la nueva estrategia `RouterInput`.
