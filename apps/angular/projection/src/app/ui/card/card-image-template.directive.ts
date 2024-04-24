import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[cardImageTemplate]',
  standalone: true,
})
export class CardImageTemplateDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
