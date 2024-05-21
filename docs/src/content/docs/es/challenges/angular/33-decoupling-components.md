---
title: 🟠 Desacoplando Componentes
description: El desafío 33 trata sobre desacoplar dos componentes fuertemente unidos utilizando Token de Inyección
author: thomas-laforge
contributors:
  - ErickRodrCodes
challengeNumber: 33
command: angular-decoupling-components
sidebar:
  order: 106
---

> Muchas gracias a **Robin Goetz** y su [Proyecto Spartan](https://github.com/goetzrobin/spartan).
> Este desafío fue propuesto por Robin y está fuertemente inspirado en su proyecto.

## Información

El objetivo de este desafío es separar el comportamiento de un componente a traves de su estilo. Para el propósito de este desafío, trabajaremos en un elemento botón. Al hacer clic en él, alternaremos una propiedad llamada _disabled_ para que cambie el estilo del elemento. Esto es bastante inútil en la vida real, pero el desafío tiene como objetivo demostrar un concepto útil.

El comportamiento del componente (referido como el _cerebro_ en el stack de Spartan) se encuentra en la biblioteca del cerebro, la cual es llamada _"brain"_. La parte de estilo (referida como el casco y llamado como _helmet_) está dentro de la biblioteca _helmet_. Ambas bibliotecas no pueden depender una de la otra porque queremos poder publicarlas por separado. Para ayudarnos a abordar el problema, estamos utilizando la regla eslint de Nx. Puedes encontrar más detalles [aquí](https://nx.dev/core-features/enforce-module-boundaries).

Sin embargo, el _helmet_ del botón necesita acceder al estado del componente para estilizar el botón de manera diferente según su estado. Como se mencionó anteriormente, no podemos importar la `BtnDisabledDirective` directamente en la biblioteca _helmet_ como se hace actualmente. Si vas a [`BtnHelmetDirective`](../../libs/decoupling/helmet/src/lib/btn-style.directive.ts), te encontrarás con un error de linting. **Un proyecto etiquetado con `type:hlm` solo puede depender de libs etiquetadas con `type:core`**.

## Declaración

El objetivo de este desafío es encontrar una forma de desacoplar ambas Directivas.

### Pista

<details>
  <summary>Pista 1</summary>
  Lee cuidadosamente el título del desafío 😇
</details>
