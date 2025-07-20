---
title: 🟢 Projection
description: Le challenge 1 consiste à apprendre à projeter des éléments DOM à travers des composants
author: thomas-laforge
contributors:
  - alannelucq
challengeNumber: 1
command: angular-projection
blogLink: https://medium.com/@thomas.laforge/create-a-highly-customizable-component-cc3a9805e4c5
videoLinks:
  - link: https://www.youtube.com/watch?v=npyEyUZxoIw&ab_channel=ArthurLannelucq
    alt: Projection video by Arthur Lannelucq
    flag: FR
  - link: https://www.youtube.com/watch?v=yNrfvu7vTa4
    alt: Projection video by Amos Lucian Isaila
    flag: ES
sidebar:
  order: 1
---

## Information

Dans Angular, la projection de contenu est une technique puissante pour créer des composants hautement personnalisables. Utiliser et comprendre les concepts liés aux <b>ng-content</b> et <b>ngTemplateOutlet</b> peut grandement améliorer votre capacité à créer des composants réutilisables.

Vous pouvez tout apprendre sur <b>ng-content</b> [ici](https://angular.dev/guide/components/content-projection), de la projection de contenu la plus simple jusqu'à des utilisations plus complexes.

Pour en savoir plus sur <b>ngTemplateOutlet</b>, vous pouvez trouver la documentation de l'API [ici](https://angular.io/api/common/NgTemplateOutlet) avec quelques exemples de base.

Avec ces deux outils en main, vous êtes maintenant prêt à relever le défi.

## Énoncé

Vous commencerez avec une application entièrement fonctionnelle qui comprend un tableau de bord contenant une carte pour les enseignants et une carte pour les élèves. L'objectif est de mettre en place la carte de la ville.

Bien que l'application fonctionne, l'expérience développeur est loin d'être optimale. Chaque fois que vous devez implémenter une nouvelle carte, vous devez modifier le `card.component.ts`. Dans des projets réels, ce composant pourrait être partagé entre de nombreuses applications. Le but du défi est de créer un `CardComponent` qui peut être personnalisé sans aucune modification. Une fois que vous aurez créé ce composant, vous pourrez commencer à implémenter le `CityCardComponent` et vous assurer de ne pas toucher au `CardComponent`.

## Contraintes

- Vous <b>devez</b> refactoriser le `CardComponent` et le `ListItemComponent`.
- La boucle `@for` doit être déclarée et rester à l'intérieur du `CardComponent`. Vous pourriez être tenté de la déplacer dans le `ParentCardComponent` comme `TeacherCardComponent`.
- Le composant `CardComponent` ne doit contenir aucune condition.
- CSS: essayez d'éviter d'utiliser `::ng-deep`. Trouvez un meilleur moyen de gérer le style CSS.

## Challenges Bonus

- Utilisez l'API des signals pour gérer l'état de vos composants (documentation [ici](https://angular.dev/guide/signals))
- Pour référencer le template, utilisez une directive au lieu d'une magic string ([Qu'est-ce qui pose problème avec les magic string ?](https://softwareengineering.stackexchange.com/a/365344))
