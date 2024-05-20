---
title: 🟠 Pipe Empacotador de Função
description: Challenge 9 is about creating a pipe to wrap component fonctions
author: thomas-laforge
contributors:
  - kabrunko-dev
challengeNumber: 9
command: angular-wrap-function-pipe
blogLink: https://medium.com/ngconf/boost-your-apps-performance-by-wrapping-your-functions-inside-a-pipe-7e889a901d1d
sidebar:
  order: 103
---

## Informação

Este é o segundo de três desafios `@Pipe()`, sendo o objetivo dominar **pipes** em Angular.

Pipes são uma maneira bem poderosa de transformar dados em seu template. A diferença entre chamar uma função e um pipe é que pipes puros são memoizados. Por isso, eles não são recalculados em cada ciclo de detecção de mudanças se suas entradas não mudarem.

Pipes são eficientes e otimizados para performance. Eles usam mecanismos de detecção de mudanças para apenas recalcular o valor se sua entrada mudar, afim de minimizar cálculos desnecessários e melhorar a performance de renderização.

Por padrão um pipe é puro, por isso você deve ter cuidado que ao configurar `pipe` como falso deixar mais propenso a ser ineficiente, uma vez que aumenta o número de renderizações.

:::note[Nota]
Um pipe **puro** é chamado apenas quando o valor muda.\
Um pipe **impuro** é chamado em cada ciclo da mudança de deteccção.
:::

Há alguns pipes pré-definidos bem úteis como DatePipe, UpperCasePipe e CurrencyPipe. Para aprender mais sobre pipes em Angular, dê uma olhada na documentação da API [aqui](https://angular.dev/guide/pipes).

## Declaração

Neste exercício, você está chamando várias funções dentro de seu template. Você pode criar um pipe específico para cada uma das funções, mas isso dará muito trabalho. O objetivo é criar um pipe `wrapFn` que empacote sua função callback através do pipe. Sua função DEVE permanecer dentro do seu componentes. **`WrapFn` deve ser reutilizável**.

## Restrições

- Deve ser fortemente tipado
