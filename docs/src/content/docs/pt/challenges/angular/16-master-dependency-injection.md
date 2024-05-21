---
title: 🔴 Dominando Injeção de Dependência
description: Desafio 16 é sobre dominar como injeção de dependência funciona
author: thomas-laforge
contributors:
  - kabrunko-dev
challengeNumber: 16
command: angular-master-dependency-injection
sidebar:
  order: 203
---

## Informação

Para completar este desafio com sucesso, precisaremos ter um bom entendimento de como Injeção de Dependência funciona dentro do Angular.

O objetivo é providenciar o `CurrencyService` no nível de linha, para que cada linha ilustre a moeda correta. Atualmente, `CurrencyService` é providenciado apenas em nível de tabela, o que resulta em um erro que mostrar a mesma moeda para cada linha, apesar de cada produto ter uma moeda diferente.

Uma maneira de alcançar isso é adicionando um segundo argumento para o pipe, mas isso não é permitido para este desafio.

## Declaração

- Sua tarefa é mostrar a moeda correta para cada linha.

## Restrições

- Você não pode modificar o pipe.
- Você não pode envolver a linha dentro de um componente, uma vez que isso quebrará o layout.
