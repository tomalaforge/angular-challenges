import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appCardButtons]',
  standalone: true,
})
export class CardButtonsDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
