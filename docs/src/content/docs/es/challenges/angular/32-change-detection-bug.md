---
title: 🟠 Bug de Detección de Cambios
description: El desafío 32 trata sobre depurar una aplicación que tiene problemas cuando se activa la detección de cambios
author: thomas-laforge
contributors:
  - ErickRodrCodes
challengeNumber: 32
command: angular-change-detection-bug
blogLink: https://medium.com/ngconf/function-calls-inside-template-are-dangerous-15f9822a6629
sidebar:
  order: 105
---

:::note
Este desafío está inspirado en un ejemplo de la vida real que hemos simplificado para crear este interesante desafío.
:::

## Información

En esta pequeña aplicación, tenemos un menú de navegación para dirigir nuestra aplicación ya sea al `BarComponent` o al `FooComponent`. Sin embargo, nuestra aplicación no se está cargando y no se muestran errores en la consola.

## Declaración

El objetivo del desafío es depurar esta aplicación y hacer que funcione.

## Pistas

<details>
  <summary>Pista 1</summary>
  
  Si comentas `routerLinkActive="isSelected"` dentro de `NavigationComponent`, la aplicación se carga correctamente.
</details>

<details>
  <summary>Pista 2</summary>

Si abres el [código fuente de `RouterLinkActive`](https://github.com/angular/angular/blob/main/packages/router/src/directives/router_link_active.ts) y vas a la **línea 196**, Angular está llamando a `this.cdr.markForCheck` dentro de una microTarea, lo que desencadena un nuevo ciclo de Detección de Cambios. Si comentas esta línea, la aplicación se carga de nuevo, sin embargo, el bug no está dentro del Framework de Angular. 😅😯

</details>
