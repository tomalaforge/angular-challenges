---
title: 🟢 async-redirect
description: O desafio 60 trata do uso da nova função `redirectTo` no Angular Router para modernizar a lógica de navegação.
author: thomas laforge
contributors:
  - tomalaforge
challengeNumber: 60
command: angular-async-redirect
sidebar:
  order: 23
  badge: New
---

## Enunciado

Neste desafio, você está trabalhando com uma aplicação Angular que atualmente utiliza um método personalizado `navigate` em `dashboard.ts` para gerenciar mudanças de rota. Com a introdução da nova função `redirectTo` no Angular Router na versão 20, o objetivo é modernizar o código removendo o antigo método `navigate` e refatorando a aplicação para usar `redirectTo` em toda a lógica de redirecionamento.

Sua tarefa é:

- Localizar e deletar o método `navigate` em `dashboard.ts`.
- Refatorar a aplicação para usar a nova função `redirectTo` do Angular Router sempre que for necessário navegar.

Isso garantirá que a aplicação aproveite os recursos mais recentes do roteamento Angular e mantenha as melhores práticas para navegação e redirecionamento.
