import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appCardImage]',
  standalone: true,
})
export class CardImageDirective {
  constructor(public readonly templateRef: TemplateRef<unknown>) {}
}
