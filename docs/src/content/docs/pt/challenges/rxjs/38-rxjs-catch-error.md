---
title: 🟢 catchError
description: Desafio 38 é sobre aprender conclusão de observable
author: devesh-chaudhari
command: rxjs-catch-error
challengeNumber: 38
sidebar:
  order: 14
---

## Informação

### Como usar a aplicação

Nossa aplicação possui um formulário com um input textual e um botão "Fetch". Ao clicar o botão, dados são requeridos de uma [API gratuita](https://jsonplaceholder.typicode.com/).

Os valores aceitos para requisições de sucesso estão limitados em: posts, comments, albums, photos, todos, and users. Qualquer outro valor, resultará em erro na requisição.

### Bug

Um bug foi identificado na nossa aplicação. Usuários conseguem apenas recuperar dados até uma requisição fracassar. Quando uma requisição retorna com erro, os usuários não conseguem mais enviar outras requisições.

### Aprendizados

Esta aplicação providencia uma oportunidade de entender onde colocar o operador [`catchError`](https://rxjs.dev/api/operators/catchError) corretamente. Se colocado de forma incorreta, a inscrição será completada, impedindo usuários de enviar mais requisições. O objetivo é preservar a inscrição através do manuseio dos erro nos observables internos de forma apropriada.

## Declaração

O objetivo é usar o operator catchError para lidar com o gerenciamento de erro dentro do seu fluxo de dados Rxjs.

## Restrições

Usuários devem ser aptos para logar o valor/erro cada vez que clicam o botão "Fetch".
