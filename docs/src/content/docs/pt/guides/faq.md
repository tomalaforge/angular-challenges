---
title: FAQ
description: Respostas para perguntas
contributors:
  - kabrunko-dev
sidebar:
  order: 7
---

<details>
  <summary>Por que minha aplicação não roda ou por que eu encontro erros no meu terminal quando executo `nx serve`?</summary>
  
  Na maioria das vezes, o problema surge por que seu `node_modules` está desatualizado e você precisa atualizá-lo executando o comando `npm ci`.

Se a instalação fracassar, você pode resolver deletando o diretório `node_modules` através do comando `rm -rf node_modules` ou `npx npkill`, e depois executar `npm ci` novamente.

Se o problema persistir, por favor reporte ele [aqui](https://github.com/tomalaforge/angular-challenges/issues/new).

</details>
