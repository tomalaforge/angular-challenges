import { Directive, Input, TemplateRef } from '@angular/core';

interface CardContentContext<T> {
  $implicit: T;
}

@Directive({
  selector: '[cardContent]',
  standalone: true,
})
export class CardContentDirective<T> {
  @Input('cardContent') content!: T[] | null;

  constructor(public templateRef: TemplateRef<CardContentContext<T>>) {}

  static ngTemplateContextGuard<TContext>(
    dir: CardContentDirective<TContext>,
    ctx: unknown
  ): ctx is CardContentContext<TContext> {
    return true;
  }
}
