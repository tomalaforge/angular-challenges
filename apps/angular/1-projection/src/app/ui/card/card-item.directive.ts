import {
  Directive,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

export interface CardItem<T> {
  $implicit: T;
}

@Directive({ selector: '[app-card-item]', standalone: true })
export class CardItemDirective<T> {
  templateRef = inject(TemplateRef<T>);
  containerRef = inject(ViewContainerRef);

  static ngTemplateContextGuard<T>(
    _dir: CardItemDirective<T>,
    _ctx: unknown,
  ): _ctx is CardItem<T> {
    return true;
  }
}
