import { Directive, input } from '@angular/core';

interface CardRowContext<T> {
  $implicit: T;
}

@Directive({
  selector: 'ng-template [cardRow]',
  standalone: true,
})
export class CardRowDirective<T> {
  cardRow = input.required<T[]>();

  static ngTemplateContextGuard<TContext>(
    directive: CardRowDirective<TContext>,
    context: unknown,
  ): context is CardRowContext<TContext> {
    return true;
  }
}
