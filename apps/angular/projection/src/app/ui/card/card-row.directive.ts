import { Directive, input } from '@angular/core';

@Directive({
  selector: '[cardRow]',
  standalone: true,
})
export class CardRowDirective<T> {
  cardRow = input.required<T[]>();

  static ngTemplateContextGuard<TContext>(
    dir: CardRowDirective<TContext>,
    ctx: any,
  ): ctx is CardRowDirective<TContext> {
    return true;
  }
}
