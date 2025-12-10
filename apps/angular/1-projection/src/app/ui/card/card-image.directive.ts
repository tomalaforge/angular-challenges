import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[cardImage]',
  standalone: true,
})
export class CardImageDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
