---
title: FAQ
description: Foire Aux Questions
contributors:
  - alannelucq
sidebar:
  order: 7
---

<details>
  <summary>
    Pourquoi mon application ne démarre-t-elle pas, ou pourquoi est-ce que je rencontre des erreurs dans mon terminal lorsque je lance `nx serve` ?
  </summary>

La plupart du temps, ce problème survient parce que vos node_modules sont obsolètes et que vous devez les mettre à jour
en exécutant `npm ci`.

Si le processus d'installation échoue, vous pouvez résoudre ce problème en supprimant votre dossier node_modules en
utilisant la commande `rm -rf node_modules` ou `npx npkill`, puis en relançant `npm ci`.

Si le problème persiste, veuillez signaler le
problème [ici](https://github.com/tomalaforge/angular-challenges/issues/new).

</details>
