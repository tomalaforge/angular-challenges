import { Directive, input } from '@angular/core';

interface CardRowContext<T> {
  $implicit: T;
}

@Directive({
  selector: 'ng-template[cardRow]',
  standalone: true,
})
export class CardRowDirective<T> {
  cardRow = input.required<T[]>();

  static ngTemplateContextGuard<T>(
    directive: CardRowDirective<T>,
    context: any,
  ): context is CardRowContext<T> {
    return true;
  }
}
