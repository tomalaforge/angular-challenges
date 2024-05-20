---
title: 🔴 Interoperabilidade Rxjs/Signal
description: Desafio 30 é sobre aprender como misturar signal com Rxjs
author: thomas-laforge
contributors:
  - kabrunko-dev
challengeNumber: 30
command: signal-interop-rxjs-signal
sidebar:
  order: 204
---

## Informação

Neste desafio, temos uma pequena aplicação reativa que usa **RxJs** e **NgRx/Component-Store**.

O objetivo deste desafio é usar a nova **API Signal** introduzida no Angular v16. No entanto, não devemos converter tudo. Certas parte do código são mais adequadas com RxJS do que Signal. É sua decisão determinar o limite e observar como **Signal e RXJS coexistem**, além de como a interoperabilidade é feita no Angular.

## Nota

- Você pode usar qualquer biblioteca de terceiros se quiser, como **ngrx/signal-store**, **tanstack-query** ou **rxAngular**.
