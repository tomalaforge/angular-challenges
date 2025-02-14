import { Directive, input } from '@angular/core';

export interface CardRowContext<T> {
  $implicit: T;
}

@Directive({ selector: 'ng-template[cardRow]' })
export class CardRowDirective<T> {
  public cardRow = input.required<T[]>();

  static ngTemplateContextGuard<T>(
    dir: CardRowDirective<T>,
    ctx: any,
  ): ctx is CardRowContext<T> {
    return true;
  }
}
