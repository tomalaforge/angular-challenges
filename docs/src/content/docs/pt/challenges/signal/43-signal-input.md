---
title: 🟢 Signal Input
description: Desafio 43 é sobre como usar signal inputs
author: thomas-laforge
contributors:
  - kabrunko-dev
challengeNumber: 43
command: signal-signal-input
sidebar:
  order: 16
---

## Informação

Finalmente, o dia chegou quando o time Angular introduziu um input reativo. Essa funcionalidade bastante requisitada é esperada há anos. A versão 17.1 introduz `SignalInput`. Ao invés de utilizar o velho conhecido decorador `@Input`, agora você tem uma função que retorna um signal.

```ts
// jeito antigo
@Input() age?: number;

// novo jeito
age = input<number>()
```

Se você quiser inputs obrigatórios

```ts
// jeito antigo
@Input({required: true}) age!: number;

// novo jeito
age = input.required<number>()
```

Se você queria obter um signal de um input, você tinha que usar um setter para configurar seu signal a partir de um input.

```ts
// jeito antigo
age = signal(0)
@Input({alias: 'age'}) set _age(age: number){
  this.age.set(age)
};

// novo jeito
age = input<number>()
```

## Declaração

Nesta pequena aplicação, o objetivo é refatorar o `UserComponent` para utilizar `SignalInput`.

- Você tem inputs obrigatórios e opcionais.
- Você pode usar a função `transform` para o input `age` e converter a propriedade diretamente para um número.
