---
title: Crie seu próprio desafio
description: Guia para criar seu próprio desafio
contributors:
  - kabrunko-dev
sidebar:
  order: 5
---

Você tem uma ideia que gostaria de compartilhar, um bug interessante que você está batendo a cabeça em um de seus projetos pessoais ou um truque no Angular que você descobriu. Todas essas possibilidades são um bom ponto de partida para criar um desafio e compartilhar a solução com as outras pessoas.

Mas como você pode criar esses desafios?

## Código Boilerplate

Para simplificar o processo, criei um gerador Nx que configurará todo código boilerplate para você começar mais rápido. A maneira mais fácil de rodar o código, é usando o console Nx: vá para <b>Nx Console > generate > @angular-challenges/cli - challenge</b>

### Parâmetros

#### parâmetros obrigatórios

- <b>title</b>: O título que você deseja dar para seu desafio.
  :::note[Nota]
  O título deve ter no máximo 25 caracteres.
  :::

- <b>challengeDifficulty</b>: A dificuldade que você acredita que o desafio tem. Têm três níveis de dificuldade: 🟢 fácil / 🟠 médio / 🔴 difícil
- <b>name</b>: nome da aplicação Nx.
  :::note[Nota]
  Deve ser escrito em **kebab-case**.
  :::
- <b>docRepository</b>: A categoria do seu desafio: Nx, Angular, Angular Performance, Rxjs, NgRx, Typescript.

#### parâmetros opcionais

- <b>directory</b>: Se você quiser que sua aplicação esteja localizada dentro de uma pasta específica de `apps`.
- <b>addTest</b>: Se você quer adicionar configuração de testes.

### O que é criado

- O gerador criará todos os arquivos necessários para ter uma nova aplicação funcional. Todos esses arquivos serão criado dentro de `apps/${directory}/${name}`
- Um arquivo Markdown com uma configuração mínima será criado dentro de `docs/src/content/docs/challenges/${docRepository}`

## Criação do Desafio

A única coisa que falta é criar seu desafio. 🚀

:::danger[Importante]
Não esqueça de atualizar a documentação para introduzir seu desafio e providenciar suas instruções.
:::

É sua vez de agir!!! 💪

## Submissão da Solução

Depois de uma semana mais ou menos, não esqueça de providenciar sua solução para seu desafio.
