import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[appCardListItem]',
  standalone: true,
  exportAs: 'appCardListItem',
})
export class CardListItemTemplateDirective {
  constructor(public template: TemplateRef<any>) {}
}
