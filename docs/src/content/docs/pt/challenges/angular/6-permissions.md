---
title: 🟠 Diretiva Estrutural
description: Desafio 6 é sobre criar uma diretiva estrutural para manipular permissões
author: thomas-laforge
challengeNumber: 6
command: angular-permissions
blogLink: https://medium.com/@thomas.laforge/create-a-custom-structural-directive-to-manage-permissions-like-a-pro-11a1acad30ad
sidebar:
  order: 102
---

## Informação

Diretiva estrutural é um conceito importante que você necessita dominar para melhorar suas habilidades e conhecimentos angular. Isso será a primeira parte deste desafio.

Guarda é também muito importante uma vez que você sempre precisará em cada aplicação que construir.

## Declaração

Em LoginComponent, você encontrará 6 botões correspondentes para 6 diferentes funções de usuário.

:::note[Nota]
Deixaram-se os nomes das funções em inglês.
:::

- Admin (Administrador)
- Manager (Gerente)
- Reader (Leitor)
- Writer (Escritor)
- Reader and Writer (Leitor e Escritor)
- Client (Cliente)
- Everyone (Todos)

## Passo 1

Em `InformationComponent`, precisa mostrar a informação correta para cada função usando uma diretiva estrutural.

### Restrições

- sem `ngIf` ou `@if` dentro de `InformationComponent`
- importart a store dentro de `InformationComponent` não é permitido.

Você deve terminar com algo semelhante com o código abaixo:

```html
<div *hasRole="Role1">Info for Role1</div>
```

```html
<div *hasRole="['Role1', 'Role2']">Info for Role1 and Role2</div>
```

```html
<div *hasRoleSuperAdmin="true">Info Only for superadmin</div>
```

## Passo 2

Em `Routes.ts`, você deve rotear todos os usuários para o `DashboardComponent` correto usando a guarda `CanMatch`.
