import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[cardActions]',
  standalone: true,
})
export class CardActionsDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
