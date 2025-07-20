---
title: 🔴 Transição de View
description: Desafio 44 você aprenderá a nova API para animação de transição de view
author: thomas-laforge
contributors:
  - kabrunko-dev
  - svenson95
challengeNumber: 44
command: angular-view-transition
sidebar:
  order: 208
---

## Informação

Este é o segundo de três desafios animation, sendo o objetivo dominar animations em Angular.

A View Transition API é uma nova API que fornece um conjunto de funcionalidades, permitindo desenvolvedores controlarem e manipularem as transições e animações entre views dentro de uma aplicação.
Isso tem um papel importante na melhoria da experiência do usuário (UX), trazendo vida a aplicações com transições atraentes e cativantes afim de guiar usuários por diferentes páginas e seções da aplicação.

O objetivo deste desafio é aprender a manipular todos os tipos de transições propostas pela API.

Para usar a API, Angular tem uma função `withViewTransitions()` que deve ser injetada dentro da configurações do roteador.

Eu recomendaria a leitura da [documentação Chrome](https://developer.chrome.com/docs/web-platform/view-transitions). Você aprenderá tudo o que é necessário para completar o desafio com sucesso.

Aqui, no entanto, um pequeno resumo:
Primeiramente, cada elemento DOM tem dois estados; um `old` para quando o elemento está deixando a página, e um `new` para quando está entrando na página:

```css
::view-transition-old(root) {
/ / animação
}

::view-transition-new(root) {
/ / animação
}
```

Para apontar um elemento em específico, você deve adicionar o seletor `view-transition-name` em uma classe CSS no nó DOM, como ilustrado abaixo:

```css
.specific-element {
  view-transition-name: specific-element;
}
```

Isso permite criar uma animação para aquele elemento apenas.

Por último, se um mesmo elemento está presente em ambas as views, você pode automatizar a transição atribuindo o mesmo **nome da transição**.

:::danger[Importante]
Lembre-se, você pode ter apenas UM ÚNICO `view-transition-name` por página.
:::

## Declaração

O objetivo deste desafio é realizar a transição entre os estados mostrados no vídeo abaixo:

<video controls src="https://github.com/tomalaforge/angular-challenges/assets/30832608/1e247bc4-3826-4e1c-afb0-aebdfec2ee85">
</video>

Para o estado final mostrado no vídeo seguinte:

<video controls src="https://github.com/tomalaforge/angular-challenges/assets/30832608/27850781-a948-4ed6-a7e4-096473b755aa">
</video>

Observe os pontos:

- O cabeçalho desliza para dentro e para fora
- Cada elemento transiciona suavemente para sua nova localização

### Nível 1

Foque apenas no primeiro thumbnail e crie uma transição agradável e transparente

### Nível 2

Crie a mesma transição atraente para todos os thumbnails, mas sem duplicar o `view-transition-name`. Note que a página tem apenas 3 thumbnails; em um cenário real, você pode ter muito mais.

### Nível 3

Mude para a localização Y correta quando navegando para frente e para trás entre as páginas.
