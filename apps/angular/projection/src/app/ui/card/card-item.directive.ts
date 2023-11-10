import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appCardItem]',
  standalone: true,
})
export class CardItemDirective {
  constructor(public readonly templateRef: TemplateRef<unknown>) {}
}
