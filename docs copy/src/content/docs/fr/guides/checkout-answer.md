---
title: Consulter la réponse de quelqu'un d'autre
description: Guide pour consulter la réponse de quelqu'un d'autre.
contributors:
  - alannelucq
sidebar:
  order: 3
---

Toutes les réponses aux Challenges Angular seront présentées sous la forme d'une pull request (PR). Pour les consulter
et
les suivre, naviguez dans la page Files Changes sur GitHub. Cependant, comprendre et suivre ce processus peut ne pas
être simple si vous n'êtes pas familier avec l'interface. Dans de nombreux cas, vous préférerez peut-être vous mettre
sur la branche et examiner la réponse dans votre IDE préféré.

## Installer la CLI de GitHub

Suivez les instructions pour votre système d'exploitation [ici](https://github.com/cli/cli#installation).

## Consulter la PR de quelqu'un d'autre en local

### Synchronisez votre dépôt

Tout d'abord, vous devez synchroniser votre fork pour vous assurer qu'il soit à jour avec le dépôt forké.

Cela peut être réalisé en cliquant sur le bouton Sync fork sur la page principale de votre fork.

![Sync project header](../../../../assets/fork-sync.png)

L'image ci-dessus montre que ma branche a 8 commits de retard par rapport à la branche principale, et je dois la
synchroniser pour qu'elle soit à jour.

![Sync project update modal](../../../../assets/sync-fork-update.png)

### Consulter la PR en local

Recherchez la PR que vous souhaitez consulter en local et récupérez son ID. Vous le trouverez dans le titre de la
PR (comme illustré ci-dessous).

![PR header](../../../../assets/PR-header.png)

Ensuite, ouvrez n'importe quel terminal dans le répertoire de votre projet et exécutez la commande suivante :

```bash
gh pr checkout <ID>
```

Si vous ne vous souvenez pas de la commande, cliquez sur le bouton Code sur le côté droit de l'en-tête, et vous pourrez
facilement la copier/coller.

![PR code modal](../../../../assets/PR-code-btn-modal.png)

:::note
Si la commande ne fonctionne pas ou échoue, l'interface CLI de GitHub vous guidera à travers le processus.
:::

🔥 Vous pouvez maintenant consulter la réponse en local et la lancer pour la tester. 🔥

<!-- gh repo set-default -->
