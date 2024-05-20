---
title: Resolva um desafio
description: Guia de como resolver um desafio
contributors:
  - kabrunko-dev
sidebar:
  order: 2
---

Neste guia, você aprenderá como resolver um desafio e submeter uma resposta para o repositório principal no GitHub.

## Introdução

Este repositório é feito com [Nx](https://nx.dev/getting-started/intro). <b>Nx</b> é um monorepositório que permite armazenar múltiplas aplicações dentro de um mesmo espaço de trabalho. Cada desafio é uma aplicação separada. Se você abrir o diretório `apps`, achará várias pastas, sendo cada uma relacionada a um desafio específico. Cada diretório representa um aplicação `Nx` completa e independente. Para executar e começar uma aplicação, abra seu terminal e use:

```bash
npx nx serve <NOME_APLICACAO>
```

:::note[Nota]
Se você não tem certeza quanto ao `NOME_APLICACAO`, abra o arquivo README.md do desafio. O comando `serve` está escrito nele com um link para a documentação do desafio.
:::

:::note[Nota]
Se `nx` está instalado globalmente no seu dispositivo, você pode pular o uso de `npx`.

Para instalar `nx` globalmente, execute:

```bash
npm i -g nx
```

:::

## Crie uma branch Git

Antes de começar a implementação de sua solução para um desafio, crie uma branch para commitar seu trabalho.

```bash
git checkout -b <NOME_BRANCH>
```

## Resolva o Desafio

Siga as instruções para resolver o desafio.

## Commitar e fazer o _Push_ do seu trabalho

O último passo é commitar seu trabalho seguindo o [Conventional Guidelines](https://www.conventionalcommits.org/en/v1.0.0/).

Finalmente, faça um push do trabalho ao repositório remoto com o seguinte comando:

```bash
git push --set-upstream origin <NOME_BRANCH>
```

:::tip[Não precisa lembrar disso]
Você não precisa lembrar do comando. Você pode simplemente lembrar do `git push` e, se é a primeira vez que você faz um push na branch, `git` fornecerá para você o comando completo.
:::

## Submeta seu Trabalho no Repositório Principal

Agora, todo seu trabalho está localizado dentro de sua instância local do repositório do Desafios Angular.

O próximo passo é ir para a [página principal do Desafios Angular](https://github.com/tomalaforge/angular-challenges) e criar um novo Pull Request.

GitHub deve mostrar no cabeçalho uma notificação para ajudar a criação do pull request.

Se não mostrar, você pode ter feito um dos passos anteriores errado ou você pode ir para a aba <b>Pull Request</b> e clicar no botão <span class="github-success-btn">New pull request</span>.

Uma vez escolhidas as duas branches para comparar, você deve ser redirecionado para a seguinte página:

![New pull request screen](../../../../assets/new-pull-request.png)

Na seção do título, comece com <b>Answer:</b> seguido pelo <b>número do desafio</b>. Depois, você está livre para adicionar o que você desejar.

:::danger[Importante]
Isso é muito importante. Isso deixará as outras pessoas saberem qual desafio você tentou resolver.
:::

Na seção de descrição, você pode adicionar perguntas, problemas que encontrou ou qualquer coisa que queira compartilhar. Você pode deixar vazio caso não tenha nada para dizer.

Agora você pode clicar em <span class="github-success-btn">Create pull request</span>.

## Receber um Feedback

Para continuar brindando comentarios y reseñas valiosas, ahora solo revisaré a aquellos que apoyen <a href="https://github.com/sponsors/tomalaforge">el proyecto en GitHub</a>.

<ul>
<li>$5 por reseña</li>
<li>$25 por reseñas de por vida</li>
<li>Crea un desafío/Contribuye para revisiones de por vida</li>
</ul>

:::note[Nota]
Todo mundo é bem-vindo para comentar e ver outros PRs.
:::

:::tip[Campeão OSS]
🔥 Ao terminar este tutorial, você está pronto para contribuir em qualquer outro repositório público do GitHub e submeter um PR. Simples assim. 🔥
:::
