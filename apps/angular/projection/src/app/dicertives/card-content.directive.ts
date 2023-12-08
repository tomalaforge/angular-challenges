import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appCardContent]',
  standalone: true,
})
export class CardContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
