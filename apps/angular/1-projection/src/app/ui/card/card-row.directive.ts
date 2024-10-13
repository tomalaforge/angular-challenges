import { Directive, input } from '@angular/core';

interface CardRowContext<T> {
  $implicit: T;
}

@Directive({ selector: 'ng-template[cardRow]', standalone: true })
export class CardRowDirective<T> {
  cardRow = input.required<T[]>();

  static ngTemplateContextGuard<TContext>(
    dir: CardRowDirective<TContext>,
    ctx: unknown,
  ): ctx is CardRowContext<TContext> {
    return true;
  }
}
