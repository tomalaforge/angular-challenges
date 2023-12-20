---
title: 🟠 Mejorar Directiva
description: El desafío 3 se trata de una directive incorporada.
author: thomas-laforge
challengeNumber: 3
command: angular-ngfor-enhancement
blogLink: https://medium.com/@thomas.laforge/ngfor-enhancement-716b44656a6c
sidebar:
  order: 101
---

:::note[Nota]

Este desafío puede parecer obsoleto ahora que disponemos del nuevo control de flujo y el bloque vacío dentro de los bloques `@for`. Sin embargo, las **directivas estructuradas** no serán borradas en ningún momento, de esta manera usted tendrá la oportunidad de aprender bastante de este desafío.

:::

## Información

Las Directivas en Angular Framework son una herramienta muy poderosa. Usted puede aplicar los principios de DRY para aplicar una lógica compartida dentro de una directiva y aplicarla a cualquier componente.

Pero el verdadero poder esta en mejorar una directiva ya existente que además **no te pertenece**.

## Declaración

En este desafío, queremos mostrar una lista de personas. Si la lista esta vacía, usted deberá mostrar _" the list is empty !! "_. (La lista esta vacía)

:::note[Nota]

En caso que hayan test automáticos para validar este desafío, se ha preferido dejar la frase en ingles, en vez de utilizar una traducción directa al español.

:::

```typescript
    <ng-container *ngIf="persons.length > 0; else emptyList">
      <div *ngFor="let person of persons">
        {{ person.name }}
      </div>
    </ng-container>
    <ng-template #emptyList>The list is empty !!</ng-template>
```

Queremos desechar el uso de ng-container al escribir:

```typescript
    <div *ngFor="let person of persons; empty: emptyList">
    {{ person.name }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
```

La meta de este desafío es **mejorar la directiva ngFor**
