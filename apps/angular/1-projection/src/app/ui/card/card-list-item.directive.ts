import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[cardListItem]',
  standalone: true,
})
export class CardListItemDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
