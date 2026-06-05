# Control Value Accessor

### Как запускать

```bash
npm run serve:forms-control-value-accessor
```

## Документация
---
title: 🟠 Control Value Accessor
description: Испытание 41 про создание пользовательское поле формы которое использует интерфейс ControlValueAccessor.
author: stanislav-gavrilov
contributors:
  - stillst
challengeNumber: 41
command: forms-control-value-accessor
sidebar:
  order: 1
---

## Информация

Цель этого испытания создать пользовательское поле формы, которое использует API формы Angular через `ControlValueAccessor`. Документацию можно посмотреть [здесь](https://angular.dev/api/forms/ControlValueAccessor). Этот интерфейс критически важен для создания пользовательских элементов управления формами, которые могут беспрепятственно взаимодействовать с API форм Angular.

## Пояснение

Задача - использовать контрол в `feedbackForm` напрямую, чтобы убрать необходимость в использовании `@Output` для получения значения из `app-rating-control` и установки его в `FormGroup`.
Кроме того, вы должны добавить валидацию для нового элемента управления, чтобы гарантировать наличие данных о рейтинге. (Кнопка отправки формы должна быть отключена, если форма недействительна).

Сейчас компонент рейтинга используется следующим образом:

```html
<app-rating-control (ratingUpdated)="rating = $event"></app-rating-control>
```

```ts
rating: string | null = null;

onFormSubmit(): void {
  this.feedBackSubmit.emit({
    ...this.feedbackForm.value,
    rating: this.rating, // not inside the FormGroup and no validation
  });
}
```

Необходимо, чтобы компонент можно было использовать так:

```html
<app-rating-control [formControl]="feedbackForm.controls.rating"></app-rating-control>
```
