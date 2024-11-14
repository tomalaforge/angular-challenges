import { Directive, input } from '@angular/core';

export interface SelectTemplateContext<T> {
  $implicit: T;
}

@Directive({
  selector: 'ng-template [cardRow]',
  standalone: true,
})
export class CardRowDirective<T> {
  cardRow = input.required<T[]>();

  static ngTemplateContextGuard<T>(
    dir: CardRowDirective<T>,
    ctx: unknown,
  ): ctx is SelectTemplateContext<T> {
    return true;
  }
}
