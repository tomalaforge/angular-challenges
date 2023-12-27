---
title: Rebase sua branch
description: Guia para realizar rebase em uma branch e atualizá-la com as mudanças mais recentes
sidebar:
  order: 6
---

De tempos em tempos, mudanças podem ser adicionadas no projeto. Eu tentarei fazer mudanças que não quebrem nada, mas algumas vezes é inevitável.

Na maioria das vezes, você não precisará fazer rebase na sua solução, mas aqui está um guia para ajudar em como fazer isso.

:::note[Nota]
Este guia é aplicável para qualquer Projeto de Código Aberto.
:::

## Passos para fazer rebase na sua branch

### Sincronize seu repositório

Primeiro, você precisa sincronizar seu fork para garantir que está tudo atualizado com o repositório bifurcado.

Você pode fazer isso clicando no botão Sync fork na página principal de seu fork.

![Sync project header](../../../../assets/fork-sync.png)

A imagem acima mostra que minha branch está atrás da branch principal por 8 commits e eu preciso sincronizar para atualizar ela com as mudanças mais recentes.

![Sync project update modal](../../../../assets/sync-fork-update.png)

### Abra um terminal

Abra um terminal de sua escolha, pode ser tanto na sua IDE favorita ou uma instância independente.

### Git

Siga os seguintes comandos para realizar um rebase na sua branch local:

- git checkout main
- git pull
- git checkout [sua branch]
- git rebase main
- Resolva Conflitos

Neste passo, o rebase pode parar, porque sua branch local tem arquivos conflitantes com a branch principal. Corrija-os e depois disso feito:

- git add .
- git rebase --continue

Se sua branch não tem nenhum conflito, uma mensagem de sucesso será mostrada.

### Faça um Push do seu trabalho para a branch remota

Por último, faça um push do seu trabalho de volta para o GitHub:

- git push -f
