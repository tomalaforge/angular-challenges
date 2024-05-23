---
title: 🟢 Pipe pur
description: Le challenge 8 consiste à créer un pipe pur
author: thomas-laforge
contributors:
  - alannelucq
challengeNumber: 8
command: angular-pure-pipe
blogLink: https://medium.com/ngconf/deep-dive-into-angular-pipes-c040588cd15d
sidebar:
  order: 3
---

## Information

Il s'agit du premier des trois challenges `@Pipe()`. L'objectif de cette série est de maîtriser les **pipes** en Angular.

Les pipes sont un moyen très puissant de transformer les données dans votre template. La différence entre appeler une fonction et un pipe réside dans le fait que les pipes purs sont mémorisés. Ils ne seront donc pas recalculés à chaque cycle de détection des changements si les données en entrée n'ont pas changées.

Les pipes sont conçus pour être efficaces et optimisés pour la performance. Ils utilisent des mécanismes de détection des changements pour ne recalculer la valeur que si la donnée en entrée change, ce qui minimise les calculs inutiles et améliore les performances de rendu.

Par défaut, un pipe est pur. Vous devez être conscient que définir `pure` à false est susceptible d'être inefficace, car cela augmente le nombre de rerenders.

:::note
Un pipe **pur** est appelé uniquement lorsque la valeur change.
Un pipe **impur** est appelé à chaque cycle de détection des changements.
:::

Il existe quelques pipes prédéfinis utiles comme DatePipe, UpperCasePipe et CurrencyPipe. Pour en savoir plus sur les pipes dans Angular, consultez la documentation de l'API [ici](https://angular.dev/guide/pipes).

## Énoncé

Dans cet exercice, vous devez refactoriser une fonction de transformation à l'intérieur d'un composant qui est appelée dans votre template. L'objectif est de convertir cette fonction en un pipe.

## Contraintes

- Doit être fortement typé
