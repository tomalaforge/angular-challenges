---
title: 🟠 Control Value Accessor
description: Desafio 41 é sobre criar um controle personalizado de formulário que implemente a interface Control Value Accessor.
author: stanislav-gavrilov
contributors:
  - kabrunko-dev
challengeNumber: 41
command: forms-control-value-accessor
sidebar:
  order: 1
---

## Informação

Neste desafio, o objetivo é criar um campo personalizado de formulário que use a Form API do Angular `ControlValueAccessor`. Você pode achar a documentação [aqui](https://angular.dev/api/forms/ControlValueAccessor). A interface é crucial para criar controles personalizados de formulário que interaja de forma transparente com a API dos formulários do Angular.

## Declaração

O objetivo principal é usar controle no `feedbackForm` para eliminar a necessidade de uso do `@Output` afim de recuperar o valor e injetar ele no `FormGroup`.
Além disso, você é obrigado a integrar validação para o novo controle afim de assegurar que os dados de avaliação existam. (O botão de submissão do formulário deve ser desabilitado se o formulário é inválido).

Atualmente, a avaliação é programada desta maneira:

```html
<app-rating-control (ratingUpdated)="rating = $event"></app-rating-control>
```

```ts
rating: string | null = null;

onFormSubmit(): void {
  this.feedBackSubmit.emit({
    ...this.feedbackForm.value,
    rating: this.rating, // fora do FormGroup e sem validação
  });
}
```

O objetivo é incluir a avaliação no `FormGroup`

```html
<app-rating-control [formControl]="feedbackForm.controls.rating"></app-rating-control>
```
