---
title: 🟠 Control Value Accessor
description: Challenge 41 is about creating a custom form control that implements Control Value Accessor interface.
author: stanislav-gavrilov
contributors:
  - stillst
challengeNumber: 41
command: forms-control-value-accessor
sidebar:
  order: 1
---

## Information

In this challenge, the goal is to create a custom form field that is using the Form API of Angular `ControlValueAccessor`. You can find the documentation [here](https://angular.dev/api/forms/ControlValueAccessor). This interface is crucial for creating custom form controls that can interact seamlessly with Angular's forms API.

## Statement

The primary goal is to use control in the `feedbackForm` to eliminate the need for using `@Output` to retrieve the value and inject it into the `FormGroup`.
Additionally, you are required to integrate validation for the new control to ensure that rating data exist. (The form submission button should be disabled if the form is invalid).

Currently, rating is coded this way:

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

The goal is to include rating into the `FormGroup`

```html
<app-rating-control [formControl]="feedbackForm.controls.rating"></app-rating-control>
```
