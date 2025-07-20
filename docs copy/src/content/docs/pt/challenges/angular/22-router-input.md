---
title: 🟢 @RouterInput()
description: Desafio 22 é sobre o uso do decorador @Input para recuperar parâmetros do roteador.
author: thomas-laforge
contributors:
  - kabrunko-dev
challengeNumber: 22
command: angular-router-input
blogLink: https://medium.com/ngconf/accessing-route-params-in-angular-1f8e12770617
sidebar:
  order: 5
---

## Informação

Nesta aplicação, recuperamos 3 pedaços de informação, dentro do nosso `TestComponent`, providenciados pelo roteador:

- Queremos recuperar `testId` encontrado nos parâmetros da URL.
- Queremos obter `user` localizado nos parâmetros query da URL.
- Queremos acessar `permission` atribuído no objeto `data` da rota.

Na versão 15 ou mais recente do Angular, usamos `ActivatedRoute` para obter todas as informações e recebê-las através de observables para escutarmos mudanças na URL.

Na versão 16, Angular introduziu um novo `Input` que pode ouvir os dados da rota. Você pode ler mais sobre [aqui](https://medium.com/ngconf/accessing-route-params-in-angular-1f8e12770617).

## Declaração

O objetivo deste exercício é refatorar o código para usar a nova estratégia `RouterInput`.
