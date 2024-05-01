import { Directive, input } from '@angular/core';

type CardRowsTemplateContext<TItem extends object> = {
  $implicit: TItem;
};
@Directive({
  selector: 'ng-template[cardRows]',
  standalone: true,
})
export class CardRowDirective<TItem extends object> {
  public data = input<TItem[]>([], { alias: 'cardRows' });

  public static ngTemplateContextGuard<TContextItem extends object>(
    directive: CardRowDirective<TContextItem>,
    context: unknown,
  ): context is CardRowsTemplateContext<TContextItem> {
    return true;
  }
}
