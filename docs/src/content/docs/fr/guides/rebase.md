---
title: Rebase votre branche
description: Guide pour faire un rebase de sa branche et récupérer les derniers changements.
contributors:
  - alannelucq
sidebar:
  order: 6
---

Parfois, des modifications peuvent être ajoutées au projet. Je vais essayer de faire des changements qui ne cassent
rien, mais parfois, c'est inévitable.

La plupart du temps, vous n'aurez pas besoin de rebaser votre solution, mais voici un guide pour vous aider à savoir
comment le faire.

:::note
Ce guide est applicable à tout projet Open Source.
:::

## Étapes pour rebaser votre branche

### Synchronisez votre dépôt

Tout d'abord, vous devez synchroniser votre fork pour vous assurer qu'il est à jour avec le dépôt forké.

Vous pouvez le faire en cliquant sur le bouton Sync fork sur la page principale de votre fork.

![Sync project header](../../../../assets/fork-sync.png)

L'image ci-dessus montre que ma branche a 8 commits de retard par rapport à la branche principale et que je dois la
synchroniser pour qu'elle soit à jour.

![Sync project update modal](../../../../assets/sync-fork-update.png)

### Ouvrez un terminal

Ouvrez le terminal de votre choix, soit celui de votre IDE préféré, soit une instance autonome.

### Git

Exécutez les commandes suivantes pour rebaser votre branche locale :

- git checkout main
- git pull
- git checkout [votre branche]
- git rebase main
- Résolvez les conflits

À cette étape, le rebase peut s'arrêter parce que votre branche locale a des fichiers en conflit avec la branche
principale. Corrigez-les.

Une fois que c'est fait :

- git add .
- git rebase --continue

Si votre branche n'a pas de conflit, un message de succès sera affiché.

### Envoyez votre travail vers la branche distante

Enfin, envoyez votre travail vers GitHub :

- git push -f
