---
title: Preguntas Frecuentes
description: Preguntas frecuentes sobre el proyecto
sidebar:
  order: 7
---

<details>
  <summary>¿Por qué mi aplicación no se está iniciando o por qué encuentro errores en mi terminal cuando ejecuto `nx serve`?</summary>
  
  La mayoría de las veces, este problema surge porque sus node_modules están desactualizados y necesita actualizarlos ejecutando `npm ci`.

Si el proceso de instalación falla, puede resolverlo eliminando su carpeta node_modules usando el comando `rm -rf node_modules` o `npx npkill` y luego volviendo a ejecutar `npm ci`.

Si el problema persiste, informe el problema [aquí](https://github.com/tomalaforge/angular-challenges/issues/new).

</details>
