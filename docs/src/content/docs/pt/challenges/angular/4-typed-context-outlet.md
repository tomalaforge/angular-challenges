---
title: 🔴 ContextOutlet Tipado
description: Desafio 4 é sobre tipagem forte em diretivas ngContextOutlet
author: thomas-laforge
contributors:
  - tomalaforge
  - tomer953
  - svenson95
  - jdegand
challengeNumber: 4
command: angular-typed-context-outlet
blogLink: https://medium.com/@thomas.laforge/ngtemplateoutlet-type-checking-5d2dcb07a2c6
sidebar:
  order: 201
---

## Informação

Você pode melhorar a verificação de tipo do template para diretivas personalizadas adicionando guardas de propriedades de template na definição de sua diretiva. Angular oferece a função estática [`ngTemplateContextGuard`](https://angular.dev/guide/directives/structural-directives#improving-template-type-checking-for-custom-directives) para tipar fortemente diretivas estruturais.

No entanto, o contexto do tipo do **NgTemplateOutlet** é **Object**. Mas com a a ajuda do guarda acima, podemos melhorar esse comportamento.

## Declaração

Neste exercício, queremos aprender como tipar fortemente nosso `ng-template` no `AppComponent`.

Este exercício tem dois níveis de complexidade.

### Nível 1: Interface Conhecida

Atualmente nós temos o seguinte trecho de código.

![Unkown Person](../../../../../assets/4/unknown-person.png 'Unkown Person')

Como podemos ver, `name` é do tipo `any`. Queremos inferir o tipo correto usando a diretiva personalizada `PersonDirective`.

### Level 2: Interface Genérica

No momento presente, temos o seguinte trecho de código.

![Unkown Student](../../../../../assets/4/unknown-student.png 'Unkown Student')

Como podemos ver, `student` é do tipo `any`. Queremos inferir o tipo correto usando a diretiva personalizada `ListDirective`.

Mas nesta parte, queremos passar uma lista de **qualquer objeto** para `LPersonistComponent`. E também queremos que o tipo correto seja inferido.
