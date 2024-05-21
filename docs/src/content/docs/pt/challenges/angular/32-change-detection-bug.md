---
title: 🟠 Bug na Detecção de Mudanças
description: Desafio 32 é sobre debuggar uma aplicação que tem um problema quando a detecção de mudanças é disparada
author: thomas-laforge
contributors:
  - kabrunko-dev
challengeNumber: 32
command: angular-change-detection-bug
blogLink: https://medium.com/ngconf/function-calls-inside-template-are-dangerous-15f9822a6629
sidebar:
  order: 105
---

:::note[Nota]
Este desafio é inspirado por um exemplo real que eu simplifiquei para criar um desafio legal.
:::

## Informação

Neste pequena aplicação, nós temos um menu de navegação que roteia nossa aplicação ou para `BarComponent` ou para `FooComponent`. No entanto, a aplicação não está carregando e os erros não são mostrado dentro do console.

## Declaração

O objetivo do desafio é debuggar a aplicação e fazer ela funcionar.

## Dicas

<details>
  <summary>Dica 1</summary>
  
  Se você comentar `routerLinkActive="isSelected"` dentro de `NavigationComponent`, a aplicação carregará corretamente.
</details>

<details>
  <summary>Dica 2</summary>

Se você abrir o [código-fonte de `RouterLinkActive`](https://github.com/angular/angular/blob/main/packages/router/src/directives/router_link_active.ts) e ir na **linha 196**, verá que o Angular chama `this.cdr.markForCheck` dentro de uma microTask, na qual dispara um novo ciclo de detecção de mudanças (CD). Se você comentar essa linha, a aplicação carrega novamente, mas o bug não é dentro do framework Angular. 😅😯

</details>
