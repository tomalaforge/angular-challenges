---
title: Comment démarrer
contributors:
  - tomalaforge
description: Un guide sur la manière de commencer avec sur Angular Challenges.
sidebar:
  order: 1
---

Pour commencer avec les <b>Challenges Angular</b>, suivez ces étapes :

## Créez un compte GitHub

Si vous souhaitez soumettre une réponse, vous devrez avoir votre propre compte GitHub. De plus, avoir un compte GitHub est toujours bénéfique et c'est gratuit.

## Forkez le projet GitHub

Accédez au [répertoire des Challenges Angular](https://github.com/tomalaforge/angular-challenges) et cliquez sur le bouton <span class="github-neutral-btn"> <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo-forked mr-2">
<path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path></svg>Fork</span> dans l'en-tête. Cela créera une copie de ce dépôt sur votre propre page GitHub.

## Clonez le dépôt sur votre machine locale

Sélectionnez un répertoire sur votre ordinateur local et clonez ce dépôt.

Ouvrez un terminal, accédez au répertoire choisi et tapez la commande suivante :

```bash
git clone https://github.com/[VOTRE_NOM_GITHUB]/angular-challenges.git
```

:::note
Vous pouvez trouver l'URL de clonage en cliquant sur le bouton <span class="github-success-btn"><> Code</span> dans votre <b>propre instance</b> du dépôt des Challenges Angular.

![Header of GitHub workspace](../../../../assets/header-github.png)

:::

## Ouvrez le projet dans votre IDE préféré

Ouvrez le projet dans n'importe quel IDE de votre choix.

## Installez toutes les dépendances

```bash
npm ci
```

## Choisissez un challenge

Votre projet est maintenant opérationnel. La seule étape restante est de choisir un challenge 🚀

Chaque challenge se compose de :

- <b>Nom</b> : indiquant de quoi traite le défi.
- <b>Numéro</b> : ordre de création. Le numéro n'a pas de signification particulière mais aide pour la référence dans la section des Demandes de Tirage (Pull Requests) GitHub.
- <b>Badge</b> : aide à visualiser le degré de difficulté. C'est entièrement subjectif 😅
  - 🟢 facile
  - 🟠 moyen
  - 🔴 difficile
