import { Directive, inject, input, TemplateRef } from '@angular/core';

export interface CardItemContext<T> {
  $implicit: T;
}

@Directive({
  selector: 'ng-template[appCardItem]',
  exportAs: 'appCardItem',
  standalone: true,
})
export class CardItemDirective<T> {
  readonly appCardItem = input<T>();

  tpl = inject(TemplateRef<CardItemContext<T>>);

  static ngTemplateContextGuard<T>(
    _dir: CardItemDirective<T>,
    _ctx: unknown,
  ): _ctx is CardItemContext<T> {
    return true;
  }
}
