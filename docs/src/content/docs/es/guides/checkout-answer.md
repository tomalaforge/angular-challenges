---
title: Revisar la Respuesta de Alguien
description: Guía para revisar la respuesta de otra persona.
sidebar:
  order: 3
---

Todas las respuestas a los Desafíos de Angular se presentarán en forma de Pull Request (PR). Para verlas y seguirlas, navega a través de la página **Files Changes** en GitHub. Sin embargo, entender y seguir este proceso puede no ser sencillo si no estás familiarizado con la interfaz. En muchos casos, puedes preferir revisar la rama y revisar la solución en tu IDE preferido.

Esta guía ha sido creada para ayudarte a lograr esto.

## Revisar localmente una PR de otra persona

### Sincroniza tu repositorio

Primero necesitas sincronizar tu fork para asegurarte de que está al día con el repositorio del que hiciste fork.

Esto se puede lograr haciendo clic en el botón **Sync fork** en la página principal de tu fork.

![Sync project header](../../../../assets/fork-sync.png)

La imagen de arriba muestra que mi rama está atrasada respecto a la rama principal por 8 commits, y necesito sincronizarla para estar al día.

![Sync project update modal](../../../../assets/sync-fork-update.png)

### Revisar localmente

Navega a la PR que deseas revisar localmente y obtén su ID. La encontrarás en el título de la PR (como se muestra a continuación).

![PR header](../../../../assets/PR-header.png)

A continuación, ve a cualquier terminal dentro de tu directorio de proyecto y ejecuta el siguiente comando:

```bash
gh pr checkout <ID>
```
