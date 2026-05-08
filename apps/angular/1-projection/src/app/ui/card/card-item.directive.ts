import { Directive, inject, TemplateRef } from '@angular/core';

export interface CardItemContext<T> {
  $implicit: T;
}

@Directive({
  selector: '[appCardItem]',
})
export class CardItemDirective<T> {
  templateRef = inject<TemplateRef<CardItemContext<T>>>(TemplateRef);

  static ngTemplateContextGuard<T>(
    _dir: CardItemDirective<T>,
    ctx: unknown,
  ): ctx is CardItemContext<T> {
    return true;
  }
}
