---
title: 🟠 Directiva Estructural
description: El Desafío 6 se trata de generar una Directiva Estructural que manipule los permisos
author: thomas-laforge
challengeNumber: 6
command: angular-permissions
blogLink: https://medium.com/@thomas.laforge/create-a-custom-structural-directive-to-manage-permissions-like-a-pro-11a1acad30ad
sidebar:
  order: 102
---

## Información

Las Directivas Estructurales son in concepto importante que necesitaras dominar para mejorar tus habilidades y conocimientos en Angular. Esta es la primera parte del desafío.

En Angular, "Guard" es un concepto muy importante por que siempre las vas a necesitar en cada aplicación que construyas.

## Declaración

En LoginComponent, encontraras 6 botones correspondientes a 6 tipos de roles de usuario:

:::note[Nota]

Se dejaran los nombres de los roles en ingles.

:::

- Admin (Administrador)
- Manager (Gerente)
- Reader (Lector)
- Writer (Escritor)
- Reader and Writer (Lector y escritor)
- Client (Cliente)
- Everyone (Todos)

## Paso 1

En `InformationComponent`, necesitaras mostrar la pieza de información correcta por cada rol usando una directiva estructural.

### Restricciones:

- No puedes usar `ngIf` o `@if` dentro de `InformationComponent`.
- No puedes importar un store dentro de `InformationComponent`.

You should end up with something like below:

```html
<div *hasRole="Role1">Información del Role1</div>
```

```html
<div *hasRole="['Role1', 'Role2']">Información del Role1 y Role2</div>
```

```html
<div *hasRoleSuperAdmin="true">Información solo para el Super Administrador</div>
```

## Paso 2

En `Routes.ts`, deberás usar la guardia `CanMatch` para dirigir a todos los usuarios al correcto `DashboardComponent`.
