---
title: 🟢 async-redirect
description: Le défi 60 porte sur l'utilisation de la nouvelle fonction `redirectTo` du routeur Angular pour moderniser la logique de navigation.
author: thomas laforge
contributors:
  - tomalaforge
challengeNumber: 60
command: angular-async-redirect
sidebar:
  order: 23
  badge: New
---

## Énoncé

Dans ce défi, vous travaillez avec une application Angular qui utilise actuellement une méthode personnalisée `navigate` dans `dashboard.ts` pour gérer les changements de route. Avec l'introduction de la nouvelle fonction `redirectTo` dans le routeur Angular en version 20, l'objectif est de moderniser la base de code en supprimant l'ancienne méthode `navigate` et en refactorant l'application pour utiliser `redirectTo` pour toute la logique de redirection.

Votre tâche est :

- Localiser et supprimer la méthode `navigate` dans `dashboard.ts`.
- Refactoriser l'application pour utiliser la nouvelle fonction `redirectTo` du routeur Angular partout où une navigation est requise.

Cela permettra à l'application de bénéficier des dernières fonctionnalités du routeur Angular et de respecter les meilleures pratiques en matière de navigation et de redirection.
