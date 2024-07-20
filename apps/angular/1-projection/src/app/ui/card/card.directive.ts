import { Directive, input } from '@angular/core';

interface CardRowContext<T> {
  $implicit: T;
  id: number;
}

@Directive({
  selector: 'ng-template[cardRow]',
  standalone: true,
})
export class CardRowDirective<T> {
  cardRow = input.required<T[]>();

  static ngTemplateContextGuard<T>(
    dir: CardRowDirective<T>,
    ctx: any,
  ): ctx is CardRowContext<T> {
    return true;
  }
}
