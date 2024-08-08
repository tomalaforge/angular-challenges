---
title: 🟠 InjectionToken
description: Desafio 39 é sobre o poder da injeção de dependência
author: thomas-laforge
contributors:
  - kabrunko-dev
challengeNumber: 39
command: angular-injection-token
videoLinks:
  - link: https://www.youtube.com/watch?v=ntggdQycFyc
    alt: Injection Token by Arthur Lannelucq
    flag: FR
sidebar:
  order: 118
---

## Informação

Nesta pequena aplicação, começamos com um `VideoComponent` contendo um temporizador de **1-segundo**. O time de desenvolvimento decidiu usar uma constante global para armazenar o valor do temporizador: `DEFAULT_TIMER`. No entanto, algumas semanas depois, o time de produto quer adicionar uma nova tela para chamadas de celular nomeada `PhoneComponent`, e nós queremos reutilizar o `TimerComponent`. Entretanto, o time de produto quer um temporizador de **2-segundos**. Como conseguiremos isso?

## Declaração

Atualmente, o temporizador ainda é de 1 segundo para o `PhoneComponent`. O objetivo deste desafio é mudar o valor do temporizador para 2 segundos para o `PhoneComponent`.

## Restrições

O uso de `@Input` é proibido. O exemplo é básico e usar `@Input` pode ser uma boa opção, mas em aplicações mais complexas, o componente que precisamos atualizar pode estar profundamente aninhado, fazendo o uso de `@Input` um design bem ruim.

## Dicas

<details>
  <summary>Dica 1</summary>

Ler esta [postagem de blog](https://itnext.io/stop-being-scared-of-injectiontokens-ab22f72f0fe9) pode ser de grande ajuda.

</details>
