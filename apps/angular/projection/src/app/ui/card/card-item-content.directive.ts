import { Directive, TemplateRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appCardItemContent]',
})
export class CardItemContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
