---
title: 🟢 Proyección
description: Desafio 1 trata sobre aprender a proyectar elementos del DOM a través de componentes,
author: thomas-laforge
challengeNumber: 1
command: angular-projection
blogLink: https://medium.com/@thomas.laforge/create-a-highly-customizable-component-cc3a9805e4c5
videoLink:
  link: https://www.youtube.com/watch?v=npyEyUZxoIw&ab_channel=ArthurLannelucq
  alt: Projection video by Arthur Lannelucq
  flag: FR
sidebar:
  order: 1
---

## Información

En Angular, la proyección de contenido es una técnica poderosa para crear componentes altamente personalizables. Utilizar y comprender los conceptos de <b>ng-content</b> y <b>ngTemplateOutlet</b> puede mejorar significativamente su capacidad para crear componentes reutilizables.

Puedes aprender todo sobre <b>ng-content</b> [aquí](https://angular.io/guide/content-projection#projecting-content-in-more-complex-environments) desde la proyección simple hasta las más complejas.

Para aprender sobre <b>ngTemplateOutlet</b>, puedes encontrar la documentación de la API [aquí](https://angular.io/api/common/NgTemplateOutlet) junto con algunos ejemplos básicos.

Con estas dos herramientas en la mano, ahora estás listo para asumir el desafío.

## Declaración

Comenzarás con una aplicación completamente funcional que incluye un tablero con una tarjeta de profesor y una tarjeta de estudiante. El objetivo es implementar la tarjeta de la ciudad.

Aunque la aplicación funciona, la experiencia del desarrollador está lejos de ser óptima. Cada vez que necesitas implementar una nueva tarjeta, tienes que modificar el `card.component.ts`. En proyectos reales, este componente puede ser compartido entre muchas aplicaciones. El objetivo del desafío es crear un `CardComponent` que se pueda personalizar sin ninguna modificación. Una vez que hayas creado este componente, puedes comenzar a implementar el `CityCardComponent` y asegurarte de que no estás tocando el `CardComponent`.

## Restricciones

- <b>Debes</b> refactorizar el `CardComponent` and `ListItemComponent`.
- La directiva NgFor debe ser declarada y permanecer dentro del `CardComponent`. Puedes sentirte tentado a moverla al `ParentCardComponent` como `TeacherCardComponent`.
- CardComponent no debe contener ningún `NgIf` o `NgSwitch`.
- CSS: intenta evitar usar `::ng-deep`. Encuentra una mejor manera de manejar los estilos de CSS.
