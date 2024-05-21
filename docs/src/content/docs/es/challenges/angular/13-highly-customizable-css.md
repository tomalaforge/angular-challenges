---
title: 🟠 Estilos CSS Altamente Personalizables
description: El desafío 13 trata sobre la creación de estilos CSS altamente personalizables
author: thomas-laforge
contributors:
  - ErickRodrCodes
challengeNumber: 13
command: angular-highly-customizable-css
sidebar:
  order: 104
---

## Información

El estilo es un aspecto importante del trabajo diario de un desarrollador de frontend, pero a menudo se subestima. En las aplicaciones de Angular, frecuentemente veo a personas usando `@Input()` para personalizar el estilo de sus componentes. Sin embargo, `@Input()` solo debe usarse para lógica. Otras técnicas, como las **variables CSS** y **host-context** deben usarse para el estilo.

En este desafío, necesitarás usar tanto variables CSS como `:host-context` para eliminar todos los `@Input()` de tu código.

## Restricciones:

- En tu presentación final, tu componente no debe contener ninguna línea de código. Todo el estilo debe manejarse dentro del decorador _(o archivos CSS externos si lo prefieres)_
