---
title: Rebase sua branch
description: Guia para realizar rebase em uma branch e atualizá-la com as mudanças mais recentes
sidebar:
  order: 6
---

De tempos em tempos, mudanças podem ser adicionadas no projeto. Eu tentarei fazer mudanças que não quebrarão nada, mas algumas vezes é inevitável.

Na maioria das vezes, você não precisará fazer _rebase_ na sua solução, mas aqui está um guia para ajudar em como fazer isso.

:::note[Nota]
Este guia é aplicável para qualquer Projeto de Código Aberto.
:::

## Passos para fazer _rebase_ na sua _branch_

### Sincronize o repositório

Primeiro, você precisa sincronizar seu _fork_ para garantir que está tudo atualizado com o repositório bifurcado.

Você pode fazer isso clicando no botão <span class="github-neutral-btn"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M1.705 8.005a.75.75 0 0 1 .834.656 5.5 5.5 0 0 0 9.592 2.97l-1.204-1.204a.25.25 0 0 1 .177-.427h3.646a.25.25 0 0 1 .25.25v3.646a.25.25 0 0 1-.427.177l-1.38-1.38A7.002 7.002 0 0 1 1.05 8.84a.75.75 0 0 1 .656-.834ZM8 2.5a5.487 5.487 0 0 0-4.131 1.869l1.204 1.204A.25.25 0 0 1 4.896 6H1.25A.25.25 0 0 1 1 5.75V2.104a.25.25 0 0 1 .427-.177l1.38 1.38A7.002 7.002 0 0 1 14.95 7.16a.75.75 0 0 1-1.49.178A5.5 5.5 0 0 0 8 2.5Z"></path></svg>Sync fork</span> na página principal de seu _fork_.

![Sync project header](../../../../assets/fork-sync.png)

A imagem acima mostra que minha _branch_ está atrás da _branch_ principal por 8 _commits_ e eu preciso sincronizar para atualizá-la com as mudanças mais recentes.

![Sync project update modal](../../../../assets/sync-fork-update.png)

### Abra um terminal

Abra um terminal de sua escolha, pode ser tanto na sua IDE de escolha ou uma instância independente.

### Git

Siga os seguintes commandos para realizar um _rebase_ na sua _branch_ local:

```bash
git checkout main
git pull
git checkout [sua branch]
git rebase main
# Por fim, resolva os conflitos
```

Neste passo, o _rebase_ pode parar, porque sua _branch_ local tem arquivos conflitantes com a _branch_ principal. Corrija-os e depois disso feito:

```bash
git add .
git rebase --continue
```

Se sua _branch_ não tem nenhum conflito, uma mensagem de sucesso será mostrada.

### _Push_ seu trabalho para a _branch_ remota

Finalmente, faça um _push_ do seu trabalho de volta para o GitHub:

```bash
git push -f
```
