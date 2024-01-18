---
title: Résoudre un Challenge
description: Guide pour résoudre un challenge
sidebar:
  order: 2
---

Dans ce guide, vous apprendrez comment résoudre un challenge et soumettre une réponse sur le répertoire principal de Github.

## Introduction

Ce répertoire utilise [Nx](https://nx.dev/getting-started/intro). <b>Nx</b> est un monorépo qui vous permet de stocker plusieurs applications à l'intérieur du même espace de travail. Chaque challenge est une application distincte. Si vous ouvrez le répertoire `apps`, vous trouverez plusieurs dossiers, chacun lié à un challenge spécifique. Chaque dossier représente une application autonome complète `Nx`. Pour exécuter et démarrer l'une d'entre elles, ouvrez votre terminal et exécutez :

```bash
npx nx serve <NOM_APPLICATION>
```

:::note
Si vous n'êtes pas sûr de votre `NOM_APPLICATION`, ouvrez le fichier README.md. La commande `serve` y est écrite, avec un lien vers la documentation du challenge.
:::

:::note
Si vous installez `nx` globalement sur votre ordinateur, vous éviterez de préfixer chaque commande par `npx`.

Pour installer `nx` globalement, exécutez

```bash
npm i -g nx
```

:::

## Créer une Branche Git

Avant de commencer à résoudre un challenge, créez une branche git pour y ajouter vos modifications.

```bash
git checkout -b <BRANCH_NAME>
```

## Résoudre un Challenge

Suivez les instructions décrites sur chaque Challenge pour le résoudre.

## Commitez et Pousser votre Travail

La dernière étape consiste à valider votre travail en suivant les [Conventional Guidelines](https://www.conventionalcommits.org/en/v1.0.0/).

Enfin, poussez votre travail vers le répertoire distant avec la commande suivante

```bash
    git push --set-upstream origin <BRANCH_NAME>
```

:::tip[Pas besoin de retenir la commande par coeur]
Vous n'avez pas besoin de mémoriser précisément la commande. Il vous suffit de vous rappeler `git push `et si c'est la première fois que vous poussez cette branche, `git` vous fournira la commande complète.
:::

## Soumettre votre Travail sur le répertoire Principal

Maintenant, tout votre travail se trouve dans votre instance locale du dépôt de Angular Challenges.

La prochaine étape est de vous rendre sur la page principale de Angular Challenges et de créer une nouvelle Pull Request.

Github devrait afficher en en-tête une notification pour vous aider à créer la pull request.

Si ce n'est pas le cas, vous avez soit mal effectué l'une des étapes précédentes, soit vous pouvez vous rendre sur l'onglet <b>Pull Request</b> et cliquer sur le bouton <span class="github-success-btn">New pull request</span>.

Une fois que vous avez choisi les deux branches à comparer, vous devriez arriver sur la page suivante :

![New pull request screen](../../../../assets/new-pull-request.png)

Dans la section du titre, commencez par <b>Réponse :</b> suivi de votre <b>numéro de challenge</b>. Ensuite, vous êtes libre d'ajouter tout ce que vous souhaitez.

:::danger
C'est très important. Cela permet aux autres de savoir quel challenge vous tentez de résoudre.
:::

Dans la section de description, vous pouvez ajouter des questions, des problèmes rencontrés ou tout autre contenu que vous souhaitez partager. Vous pouvez laisser vide si vous n'avez rien à dire.

Vous pouvez maintenant cliquer sur <span class="github-success-btn">Créer pull request</span>.

Je la lirai et commenterai <b>quand j'aurai du temps libre.</b>

<p class="important-block">Ne vous inquiétez pas si votre réponse n'est pas examinée immédiatement. Je le fais <b>gratuitement</b> et pendant mon <b>temps libre</b>. Si vous souhaitez me soutenir, vous pouvez le faire en me <a href="https://github.com/sponsors/tomalaforge">sponsorisant sur github</a>. Cela validera que mon travail vous aide, vous ou votre équipe.</p>

:::note
Tout le monde peut commenter ou lire les Pull Requests des autres participants.
:::

:::tip[Champion OSS]
🔥 Une fois que vous avez terminé ce tutoriel, vous êtes prêt à contribuer à n'importe quel répertoire public Github et à soumettre une PR. C'est aussi simple que ça. 🔥
:::
