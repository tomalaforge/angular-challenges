---
title: Créer un challenge
description: Guide sur comment créer un challenge
contributors:
  - alannelucq
sidebar:
  order: 5
---

Vous avez une idée à partager, un bug intéressant avec lequel vous luttez dans l'un de vos projets privés ou
secondaires, ou une astuce Angular que vous avez découverte ? Toutes ces situations sont un bon point de départ pour
créer un challenge et partager votre solution avec les autres.

Comment commencer à créer ces challenges ?

## Configuration de base

Pour simplifier le processus, j'ai créé un générateur Nx qui configurera tout le code de base pour vous. Le moyen le
plus
simple de l'exécuter est d'utiliser la console Nx : allez dans <b>Nx Console > generate > @angular-challenges/cli -
challenge</b>.

Vous pouvez également utiliser [l'extension Nx Console](https://nx.dev/getting-started/editor-setup) de votre IDE pour
générer les fichiers.

### Paramètres

#### Paramètres obligatoires

- <b>title</b>: Le titre que vous souhaitez donner à votre challenge.
  :::note
  Le titre doit comporter un maximum de 25 caractères.
  :::

- <b>challengeDifficulty</b>: La difficulté estimée de votre challenge. Il y a trois niveaux de difficulté : 🟢 facile /
  🟠 moyen / 🔴 difficile
- <b>name</b>: Le nom de l'application Nx.
  :::note
  Il doit être écrit en **kebab-case**.
  :::
- <b>docRepository</b>: La catégorie de votre challenge : Nx, Angular, Angular Performance, Rxjs, NgRx, Typescript, ou
  Forms.

#### Paramètres optionnels

- <b>directory</b>: Si vous souhaitez que votre application soit située dans un dossier spécifique à l'intérieur
  de `apps`.
- <b>addTest</b>: Si vous souhaitez ajouter une configuration de test.

### Qu'est-ce qui est créé ?

- Le générateur créera tous les fichiers nécessaires pour avoir une nouvelle application fonctionnelle. Tous ces
  fichiers seront créés dans apps/${directory}/${name}.
- Un fichier Markdown avec une configuration minimale sera créé dans docs/src/content/docs/challenges/${docRepository}.

## Création d'un challenge

La seule chose qu'il vous reste à faire est de créer votre challenge. 🚀

:::danger
N'oubliez pas de mettre à jour la documentation pour présenter votre challenge et fournir vos instructions.
:::

À vous de jouer !!! 💪

## Soumission d'une solution

Après environ une semaine, fournissez une pull request de la solution de votre challenge.
