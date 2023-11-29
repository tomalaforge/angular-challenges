import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appCardTemplateContent]',
  standalone: true,
})
export class CardTemplateContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
