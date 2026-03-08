import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[cardListItem]',
  exportAs: 'cardListItem',
})
export class CardListItemTemplateDirective {
  template: TemplateRef<{
    $implicit: any;
    onDeleteAction: (id: number) => void;
  }> = inject(TemplateRef);
}
