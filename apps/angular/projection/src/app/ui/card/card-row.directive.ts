import { Directive, TemplateRef, inject } from '@angular/core';

export interface CardRowContext<T> {
  $implicit: T;
}

@Directive({
  standalone: true,
  selector: '[appCardRow]',
})
export class CardRowDirective<T> {
  readonly template: TemplateRef<CardRowContext<T>> = inject(TemplateRef);
}
