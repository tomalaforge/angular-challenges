import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[cardHeaderTemplate]',
  standalone: true,
})
export class CardHeaderTemplateDirective {
  constructor(public templateRef: TemplateRef<void>) {}
}
