---
title: 🟢 Module vers Standalone
description: Le challenge 31 consiste à migrer une application basée sur des modules vers une application standalone.
author: thomas-laforge
contributors:
  - alannelucq
challengeNumber: 31
command: angular-module-to-standalone
sidebar:
  order: 6
---

## Information

Dans la version 14 d'Angular, les composants standalone ont été introduits et sont devenus stables dans la version 15. Si vous ne les avez pas encore essayés, il n'est jamais trop tard. Vous pouvez les essayer dans ce challenge.

L'objectif est de voir comment **Nx** et les **composants standalone** fonctionnent ensemble, et d'expérimenter le processus de découplage de votre application avec la bibliothèque Nx et les composants standalone.

Les composants standalone sont très simples à comprendre mais les utilisations de ces composants dans **le routing et via du lazy-loading** peuvent être un peu plus difficiles à appréhender. Ce challenge vous permettra de manipuler des composants à différents niveaux d'imbrication et de travailler avec des routes qui utilisent du lazy loading.

Après avoir complété ce défi, les composants standalone n'auront plus aucun secret pour vous.

## Énoncé

L'objectif de ce challenge est de migrer votre application depuis des composants basés sur des modules vers des composants standalone.

## Note

Vous pouvez également tester le [schematic Angular](https://angular.dev/reference/migrations/standalone) pour migrer les NgModule vers des composants standalone. _(Comme nous utilisons Nx, commencez votre commande par nx au lieu de ng)_
