---
title: 🟢 @RouterInput()
description: Challenge 22 is about using the @Input decorator to retreive router params.
author: thomas-laforge
contributors:
  - alannelucq
challengeNumber: 22
command: angular-router-input
blogLink: https://medium.com/ngconf/accessing-route-params-in-angular-1f8e12770617
sidebar:
  order: 5
---

## Information

Dans cette application, nous récupérons trois informations depuis le routeur dans notre `TestComponent` :

- `testId` qui est situé dans les paramètres de l'URL.
- `user` qui est situé dans les paramètres de la requête de l'URL.
- `permission` qui est défini dans l'objet `data` de la route.

Jusqu'à la version 15 d'Angular, nous devions utiliser le `ActivatedRoute` pour obtenir toutes ces informations et les récupérer via des observables pour écouter sur les changements d'URL.

Depuis la version 16, Angular a introduit un nouvel `Input` qui peut écouter les changements de données d'une route. Vous pouvez en savoir plus [ici](https://medium.com/ngconf/accessing-route-params-in-angular-1f8e12770617).

## Énoncé

L'objectif de cet exercice est de refactoriser le code pour utiliser la nouvelle stratégie `RouterInput`.
