import { Directive, inject, TemplateRef } from '@angular/core';

export interface CardRowContext<T> {
  $implicit: T;
}

@Directive({
  selector: 'ng-template[cardRow]',
  standalone: true,
})
export class CardRowDirective<T> {
  readonly templateRef = inject(TemplateRef<CardRowContext<T>>);
}
