---
title: 🟢 Aplicación CRUD
description: El desafío 5 se trata de refactorizar una aplicación CRUD.
author: thomas-laforge
challengeNumber: 5
command: angular-crud
sidebar:
  order: 2
---

## Información

Comunicar y tener acceso a un estado global o local en sincronización con tu backend es el corazón de cualquier aplicación. Usted necesita dominar las siguientes mejores practicas para construir aplicaciones en Angular de manera solida y confiable.

## Declaración

En este desafió tenemos una pequeña aplicación CRUD, la cual puede obtener una lista de COSAS POR HACER, actualizar y borrar algunos de los elementos de dicha lista.

Actualmente tenemos un ejemplo funcional, pero repleto de practicas erróneas.

### Paso 1: Refactorizar con mejores practicas.

Usted necesitara:

- Evite el uso del tipo **any**. Use interfaces para prevenir los errores de tipo en Typescript.
- Use un **servicio separado** para todas las llamadas de http, y use **Signals** para la lista de cosas por hacer.
- No **mutar** los datos

```typescript
// Evite esto
this.todos[todoUpdated.id - 1] = todoUpdated;

// en vez de ello, use algo como esto, pero necesitara mejorar la lógica de manera que preserve el mismo orden.
this.todos = [...this.todos.filter((t) => t.id !== todoUpdated.id), todoUpdated];
```

### Step 2: Mejorar

- Agregue un botón para **borrar** : _<a href="https://jsonplaceholder.typicode.com/" target="_blank">Documentación de la API falsa</a>_
- Opera de manera correcta los **errores**. _(Globalmente)_
- Agrega un indicador global de **carga**. _Puedes utilizar MatProgressSpinnerModule_

### Step 3: Mantenibilidad!! adiciona algunos tests

- Adiciona 2/3 tests

### Step 4: Creatividad!!! Domina tu estado.

- Usa de manera apropiada **un component store de ngrx**, **ngrx/store**, **rxAngular**, **tanstack-query** o **ngrx/signal-store** como estado local de tu componente.
- Tener un indicador de Carga/Error **localizado**. Por ejemplo: Solo en el elemento seleccionado de la lista siendo procesado y **desactivar** todos los botones de dicho elemento. _(Pista: Necesitaras crear un ItemComponent)_
