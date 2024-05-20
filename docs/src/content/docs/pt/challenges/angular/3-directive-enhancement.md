---
title: 🟠 Aprimoramento de Diretiva
description: Desafio 3 é sobre o aprimoramento de uma diretiva nativa
author: thomas-laforge
contributors:
  - kabrunko-dev
challengeNumber: 3
command: angular-directive-enhancement
blogLink: https://medium.com/@thomas.laforge/ngfor-enhancement-716b44656a6c
sidebar:
  order: 101
---

:::note[Nota]
Este exercício pode ser obsoleto com o novo controle de fluxo e do bloco de empty state dentro do bloco `@for`. No entanto, **diretivas estruturais** não serão removidas tão cedo, por isso você ainda pode aprender bastante com este exercício.
:::

## Informação

Diretiva é uma ferramente poderosa oferecida pelo framework Angular. Você pode usar o princípio DRY compartilhando a lógica dentro de uma diretiva e aplicando ela em qualquer componente que quiser.

Mas a verdadeira vantagem é que você consegue melhorar uma diretiva pré-existente que não **pertence** a você.

## Declaração

Neste exercício, queremos mostrar uma lista de pessoas. Se a lista está vazio, você deve mostrar _" the list is empty !! "_.

Atualmente, temos:

```typescript
    <ng-container *ngIf="persons.length > 0; else emptyList">
      <div *ngFor="let person of persons">
        {{ person.name }}
      </div>
    </ng-container>
    <ng-template #emptyList>The list is empty !!</ng-template>
```

Queremos nos livrar do `ng-container` escrevendo:

```typescript
    <div *ngFor="let person of persons; empty: emptyList">
    {{ person.name }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
```

Objetivo é **melhorar a diretiva ngFor**.
