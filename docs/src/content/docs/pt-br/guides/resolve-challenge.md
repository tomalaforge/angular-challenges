---
title: Resolver um desafio
description: Guia de como resolver um desafio
sidebar:
  order: 2
---

Neste guia, você aprenderá em como resolver um desafio e submeter uma resposta para o repositório principal no GitHub.

## Introdução

Este repositório é feito com [Nx](https://nx.dev/getting-started/intro). <b>Nx</b> é uma monorepositório que permite armazenar múltiplaa aplicações dentro de um mesmo espaço de trabalho. Cada desafio é uma aplicação separada. Se você abrir o diretório `apps`, achará várias pastas, sendo cada uma relacionada a um desafio específico. Cada diretório representar um aplicação `Nx` completa e independente. Para executar e começar uma aplicação, abra seu terminal e use:

```bash
npx nx serve <NOME_APLICACAO>
```

:::note[Nota]
Se você não tem certeza quanto ao `NOME_APLICACAO`, abra o arquivo README.md com o nome do desafio. O comando `serve` está escrito nele com um link para a documentação do desafio.
:::

:::note[Nota]
Se `nx` está instalado globalmente no seu dispositivo, você pode pular o uso de `npx`.

Para instalar `nx` globalmente, execute:

```bash
npm i -g nx
```

:::

## Crie uma branch Git

Antes de começar a implementação de sua solução para um desafio, crie uma _branch_ para commitar seu trabalho.

```bash
git checkout -b <NOME_BRANCH>
```

## Resolva o Desafio

Siga as instruções para resolver o desafio.

## Commitar e fazer o _Push_ do seu trabalho

O último passo é commitar seu trabalho seguindo o [Conventional Guidelines](https://www.conventionalcommits.org/en/v1.0.0/).

Finalmente, faça um _push_ do trabalho ao repositório remoto com o seguinte comando:

```bash
git push --set-upstream origin <NOME_BRANCH>
```

:::tip[Não lembre disso]
Você não precisa lembrar do comando. Você pode simplemente lembrar do `git push` e se é a primeira vez que você efetua um _push_ na _branch_, `git` fornecerá para você o comando completo.
:::

## Submeta seu trabalho no Repositório Principal

Agora, todo seu trabalho está localizado dentro de sua instância local do repositório do Desafios Angular.

O próximo passo é ir para a [página principal do Desafios Angular](https://github.com/tomalaforge/angular-challenges) e criar um novo _Pull request_.

GitHub deve mostrar um cabeçalho notificação para ajudar a criação do _pull request_.

Se não mostrar, você pode ter feito um dos passos anteriores errado ou você pode ir para a aba <b>Pull Request</b> e clicar no botão <span class="github-success-btn">New pull request</span>.

Uma vez escolhidas as duas _branches_ para comparar, você deve ser redirecionado para a página:

![New pull request screen](../../../../assets/new-pull-request.png)

Na seção do título, comece com <b>Answer:</b> seguido pelo <b>número do desafio</b>. Depois, você está livre para adicionar o que você desejar.

:::danger[Perigo]
Isso é muito importante. Isso deixará as outras pessoas saberem qual desafio você tentou resolver.
:::

Na seção de descrição, você pode adicionar perguntas, problemas que encontrou ou qualquer coisa que queira compartilhar. Você pode deixar vazio caso não tenha nada para dizer.

Você pode clicar em <span class="github-success-btn">Create pull request</span>.

Eu lerei e comentarei <b>quando eu tiver algum tempo livre.</b>

<p class="important-block">Não se preocupe se sua resposta não for revisada imediatamente. Estou fazendo isso de <b>graça</b> e durante meu <b>tempo livre</b>. Se você quiser me ajudar, você pode fazê-lo <a href="https://github.com/sponsors/tomalaforge">me patrocinando no github</a>. Isso mostrará que meu trabalho é de grande ajuda para você e seu time.</p>

:::note[Nota]
Todo mundo é bem-vindo para comentar e ver outros PRs.
:::

:::tip[Campeão OSS]
🔥 Ao terminar este tutorial, você está pronto para contribuir para qualquer outro repositório público do GitHub e submeter um PR. É tão simples quanto isso. 🔥
:::
