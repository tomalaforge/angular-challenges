import { Directive, input } from '@angular/core';
import { TemplateContext } from '../../model/card.model';

@Directive({
  selector: 'ng-template[cardItem]',
})
export class CardItemDirective<T extends object> {
  cardItem = input.required<T[]>();

  static ngTemplateContextGuard<TContext extends object>(
    dir: CardItemDirective<TContext>,
    ctx: unknown,
  ): ctx is TemplateContext<TContext> {
    return true;
  }
}
