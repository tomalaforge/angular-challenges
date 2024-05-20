---
title: 🟢 Aplicação Crud
description: Desafio 5 é sobre refatorar uma aplicação crud is about refactoring a crud application
author: thomas-laforge
contributors:
  - kabrunko-dev
challengeNumber: 5
command: angular-crud-application
sidebar:
  order: 2
---

## Informação

Comunicar e ter um estado global/local em sincronia com seu backend é o coração de qualquer aplicação. Você necessitará dominar as seguintes melhores práticas para construir aplicações Angular fortes e confiáveis.

## Declaração

Neste exercício, você tem uma pequena aplicação CRUD, que tem uma lista de TODOS, atualiza e exclui alguns todos.

Atualmente temos um exemplo funcional, mas cheio de más práticas.

### Passo 1: refatorar com melhores práticas

O que você precisará:

- Evite **any** como um tipo. Use Interface para aproveitar o sistema de tipos do Typescript para evitar erros
- Use um **serviço separado** para todas suas chamadas http e use um **Signal** para sua lista de todos
- Não **mute** em seus dados

```typescript
// Evite isto
this.todos[todoUpdated.id - 1] = todoUpdated;

// Prefira algo assim, mas precisa melhorar, porque queremos manter a mesma ordem.
this.todos = [...this.todos.filter((t) => t.id !== todoUpdated.id), todoUpdated];
```

### Passo 2: Melhore

- Adicione um botão **Deletar**: _<a href="https://jsonplaceholder.typicode.com/" target="_blank">Documentação de API falsa</a>_
- Lide com **erros** corretamente. _(Globalmente)_
- Adicione um indicador de **carregamento** global. _Você pode usar MatProgressSpinnerModule_

### Passo 3: Manutenibilidade!! adicione alguns testes

- Adicione 2/3 testes

### Step 4: Incrível!!! domine seu estado.

- Use o **componente store do ngrx**, **ngrx/store**, **rxAngular**, **tanstack-query** ou **ngrx/signal-store** como estado local de seu componente.
- Tenha um indicador de carregamento/erro **localizado**, e.g. apenas no Todo sendo processado e **desabilite** todos os botões do Todo processado. _(Dica: você precisará criar um ItemComponent)_
