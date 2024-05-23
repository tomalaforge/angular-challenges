---
title: 🟢 Application CRUD
description: Le challenge 5 consiste à refactoriser une application CRUD
author: thomas-laforge
contributors:
  - alannelucq
challengeNumber: 5
command: angular-crud-application
sidebar:
  order: 2
---

## Information

Communiquer et synchroniser un état global ou local avec votre backend est au cœur de toute application. Vous devrez maîtriser les meilleures pratiques suivantes pour construire des applications Angular solides et fiables.

## Énoncé

Dans cet exercice, vous avez une petite application CRUD dans laquelle vous pouvez récupérer, mettre à jour et supprimer des tâches.

Pour le moment, nous avons un exemple fonctionnel mais qui est rempli de nombreuses mauvaises pratiques.

### Étape 1 : refactoriser avec les meilleures pratiques

Ce que vous devrez faire:

- Évitez d'utiliser **any** comme type. Utiliser des interfaces pour tirer parti du système de typage de Typescript permet d'éviter les erreurs.
- Utilisez un **service séparé** pour tous vos appels HTTP et utilisez un **Signal** pour votre liste de tâches.
- Ne **mutez** pas les données

```typescript
// À éviter
this.todos[todoUpdated.id - 1] = todoUpdated;

// Privilégier une approche comme celle-ci, mais qui doit être améliorée car nous voulons toujours conserver le même ordre
this.todos = [...this.todos.filter((t) => t.id !== todoUpdated.id), todoUpdated];
```

### Étape 2 : Améliorer

- Ajoutez un bouton **Supprimer** : _<a href="https://jsonplaceholder.typicode.com/" target="_blank">Documentation de l'API fictive</a>_
- Gérez correctement les **erreurs**. _(De façon globale)_
- Ajoutez un **indicateur de chargement** global. _Vous pouvez utilisez le MatProgressSpinnerModule_

### Étape 3 : Maintenabilité !! (ajoutez des tests)

- Ajoutez 2/3 tests

### Étape 4 : Effet waouw !!! (maîtrisez votre état).

- Utilisez le **component store de ngrx**, **ngrx/store**, **rxAngular**, **tanstack-query** ou **ngrx/signal-store** pour gérer l'état local de votre composant.
- Ayez un indicateur de chargement/erreur **localisé** , par exemple uniquement sur la tâche en cours de traitement et **désactivez** tous les boutons sur cette tâche. _(Astuce: vous devrez créer un ItemComponent)_
