---
title: 🟢 Projeção
description: Desafio 1 é sobre aprender a projetar elementos DOM através de componentes
author: thomas-laforge
challengeNumber: 1
command: angular-projection
blogLink: https://medium.com/@thomas.laforge/create-a-highly-customizable-component-cc3a9805e4c5
videoLink:
  link: https://www.youtube.com/watch?v=npyEyUZxoIw&ab_channel=ArthurLannelucq
  alt: Vídeo de projeção por Arthur Lannelucq
  flag: FR
sidebar:
  order: 1
---

## Informação

Em Angular, projeção de conteúdo é uma técnica robusta para criar componente altamente personalizados. Usar e entender os conceitos do <b>ng-content</b> e <b>ngTemplateOutlet</b> pode melhorar significativamente sua habilidade na criação de componentes compartilháveis.

Você pode aprender tudo sobre <b>ng-content</b> [aqui](https://angular.io/guide/content-projection#projecting-content-in-more-complex-environments), desde projeção simples até casos mais complexos.

Para aprender sobre <b>ngTemplateOutlet</b>, você pode acessar a documentação [aqui](https://angular.io/api/common/NgTemplateOutlet) junto a alguns exemplos básicos.

Com essas duas ferramentas em mãos, você está pronto para realizar o desafio.

## Declaração

Você começará com uma aplicação totalmente funcional que inclui um dashboard, que possui um cartão de professor e de estudante. O objetivo é implementar o cartão de cidade.

Apesar da aplicação funcionar, a experiência do desenvolvedor (DX) está nem um pouco otimizada. Toda vez que você precisar implementar um novo cartão, você terá que modificar o `card.component.ts`. Em projetos reais, esse componente pode ser compartilhado entre várias aplicações. O objetivo do desafio é criar um `CardComponent` que possa ser personalizado sem nenhuma modificação. Uma vez criado o componente, você pode começar a implementar o `CityCardComponent` e assegurar que não mexerá no `CardComponent`.

## Restrições

- Você <b>deve</b> refatorar o `CardComponent` e `ListItemComponent`.
- A diretiva `NgFor` deve ser declarada e permanecer dentro do `CardComponent`. Você pode ficar instigado em querer mover ela para o `ParentCardComponent` como `TeacherCardComponent`.
- `CardComponent` não deve conter nenhum `NgIf` ou `NgSwitch`.
- CSS: tente evitar usar `::ng-deep`. Ache uma maneira melhor para lidar com o CSS.

## Desafios Bônus

- Tente trabalhar com a nova sintaxe nativa de controle de fluxo para laços e condicionais (documentação [aqui](https://angular.dev/guide/templates/control-flow))
- Usa a signal API para gerenciar o estado de seus componentes (documentação [aqui](https://angular.dev/guide/signals))
- Para referenciar o template, use uma diretiva ao invés de strings mágicas
