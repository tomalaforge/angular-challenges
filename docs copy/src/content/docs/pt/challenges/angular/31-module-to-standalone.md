---
title: 🟢 Módulo para Standalone
description: Desafio 31 é sobre migrar uma aplicação baseada em módulos para uma aplicação baseada em componentes standalone.
author: thomas-laforge
contributors:
  - kabrunko-dev
challengeNumber: 31
command: angular-module-to-standalone
sidebar:
  order: 6
---

## Informação

Em v14, componentes standalone foram lançados e foram estabilizados na v15. Se você ainda não brincou com eles, nunca é tarde. Você pode tentar neste desafio.

Além disso, o objetivo é ver como **Nx** e **componentes standalone** trabalham juntos, e experimentar o processo de desacoplagem de sua aplicação com a biblioteca Nx e componentes standalone.

Finalmente, componentes standalone são bem simples de entender, mas **componentes de roteameanto/lazy-loaded** podem ser um pouco difíceis de compreender. Este desafio permitirá manipular componentes em diferentes níveis de aninhamento e trabalhar com rotas carregadas preguiçosamente (lazy-loaded).

Após completar este desafio, componentes standalone não serão mais segredo para você.

## Declaração

O objetivo deste desafio é migrar sua aplicação de componentes baseados em módulos para componentes standalone.

## Nota

Você também pode testar o [Angular schematic](https://angular.dev/reference/migrations/standalone) para migrar NgModule para componentes Standalone. _(Como estamos usando nx, comece seu comando com nx ao invés de ng)_
