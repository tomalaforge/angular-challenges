import { Directive, Input, TemplateRef } from '@angular/core';

interface CardContext<TItem> {
  $implicit: TItem;
}
@Directive({
  selector: '[cardContent]',
  standalone: true,
})
export class CardDirective<TItem> {
  @Input('cardContent') content!: TItem[] | null;

  constructor(public templateRef: TemplateRef<CardContext<TItem>>) {}

  static ngTemplateContextGuard<TContext>(
    dir: CardDirective<TContext>,
    ctx: unknown
  ): ctx is CardContext<TContext> {
    return true;
  }
}
