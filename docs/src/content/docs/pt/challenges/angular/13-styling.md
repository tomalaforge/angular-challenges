---
title: 🟠 CSS Altamente Personalizável
description: Desafio 13 é sobre criar estilos CSS altamente personalizáveis
author: thomas-laforge
challengeNumber: 13
command: angular-styling
sidebar:
  order: 104
---

## Informação

Estilização é um aspecto importante do trabalho diário de um desenvolvedor frontend, mas é muitas vezes subestimado. Em aplicações Angular, eu frequentemente vejo pessoas usando `@Input()` para personalizar o estilo de seus componentes. No entanto, `@Input()` deve ser usado apenas para lógica. Outras técnicas, como **variáveis CSS** e **host-context** devem ser usadas para estilização.

Neste desafio, você precisará usar tanto variáveis CSS como `:host-context` para remover todos `@Input()` de seu código.

## Restrições

- Na sua submissão final, seu componente não deve conter nenhuma linha de código. Toda a estilização deve ser manipulada dentro do decorador _(ou arquivos css externos se preferir)_

## Nota

Há uma outra maneira de estilizar o componente `TextStaticComponent` (ver [PR](https://github.com/tomalaforge/angular-challenges/pull/341/files#diff-082bc0154adae46609f52c9e366d4768ae9278dcb495a9a7ec7cb0baf393fb1c))
