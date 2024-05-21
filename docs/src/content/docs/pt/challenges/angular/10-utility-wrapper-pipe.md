---
title: 🔴 Pipe Empacotador de Utilidade
description: Desafio 10 é sobre a criação de um pipe para empacotar utilidades
author: thomas-laforge
contributors:
  - kabrunko-dev
challengeNumber: 10
command: angular-utility-wrapper-pipe
sidebar:
  order: 202
---

## Informação

Este é o terceiro de três desafios `@Pipe()`, sendo o objetivo dominar **pipes** em Angular.

Pipes são uma maneira bem poderosa de transformar dados em seu template. A diferença entre chamar uma função e um pipe é que pipes puros são memoizados. Por isso, eles não são recalculados em cada ciclo de detecção de mudanças se suas entradas não mudarem.

Pipes são eficientes e otimizados para performance. Eles usam mecanismos de detecção de mudanças para apenas recalcular o valor se sua entrada mudar, afim de minimizar cálculos desnecessários e melhorar a performance de renderização.

Por padrão um pipe é puro, por isso você deve ter cuidado que ao configurar `pipe` como falso deixar mais propenso a ser ineficiente, uma vez que aumenta o número de renderizações.

:::note[Nota]
Um pipe **puro** é chamado apenas quando o valor muda.\
Um pipe **impuro** é chamado em cada ciclo da mudança de deteccção.
:::

Há alguns pipes pré-definidos bem úteis como DatePipe, UpperCasePipe e CurrencyPipe. Para aprender mais sobre pipes em Angular, dê uma olhada na documentação da API [aqui](https://angular.dev/guide/pipes).

## Declaração

Neste exercício, você quer acessar algumas funções úteis. Atualmente você não consegue acessá-las diretamente do seu template. O objetivo é criar um pipe específico para o arquivo de úteis, e você precisará passar o nome da função que deseja chamar e os argumentos necessários.

## Restrições

- Deve ser fortemente tipado
