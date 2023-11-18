import { Directive, inject, TemplateRef } from '@angular/core';

export interface CardRowContext<T> {
  $implicit: T;
}

@Directive({
  selector: 'ng-template[cardRow]',
  standalone: true,
})
export class CardRowDirective<T> {
  public readonly template: TemplateRef<CardRowContext<T>> =
    inject(TemplateRef);

  public static ngTemplateContextGuard<TContext>(
    _dir: CardRowDirective<TContext>,
    _ctx: unknown
  ): _ctx is CardRowContext<TContext> {
    return true;
  }
}
