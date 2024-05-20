---
title: 🟢 Pipe Puro
description: Desafio 8 é sobre criar um pipe puro
author: thomas-laforge
contributors:
  - kabrunko-dev
challengeNumber: 8
command: angular-pure-pipe
blogLink: https://medium.com/ngconf/deep-dive-into-angular-pipes-c040588cd15d
sidebar:
  order: 3
---

## Informação

Este é o primeiro de três desafios `@Pipe()`, sendo o objetivo dominar **pipes** em Angular.

Pipes são uma maneira bem poderosa de transformar dados em seu template. A diferença entre chamar uma função e um pipe é que pipes puros são memoizados. Por isso, eles não são recalculados em cada ciclo de detecção de mudanças se suas entradas não mudarem.

Pipes são eficientes e otimizados para performance. Eles usam mecanismos de detecção de mudanças para apenas recalcular o valor se sua entrada mudar, afim de minimizar cálculos desnecessários e melhorar a performance de renderização.

Por padrão um pipe é puro, por isso você deve ter cuidado que ao configurar `pipe` como falso deixar mais propenso a ser ineficiente, uma vez que aumenta o número de renderizações.

:::note[Nota]
Um pipe **puro** é chamado apenas quando o valor muda.\
Um pipe **impuro** é chamado em cada ciclo da mudança de deteccção.
:::

Há alguns pipes pré-definidos bem úteis como DatePipe, UpperCasePipe e CurrencyPipe. Para aprender mais sobre pipes em Angular, dê uma olhada na documentação da API [aqui](https://angular.dev/guide/pipes).

## Declaração

Neste exercício, você precisa refatorar uma função de transformação dentro de um componente, o qual é chamado dentro de seu template. O objetivo é converter essa função em um pipe.

## Restrições

- Deve ser fortemente tipado
