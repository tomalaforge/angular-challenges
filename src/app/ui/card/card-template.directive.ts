import { Directive } from '@angular/core';

@Directive({
  selector: '[appCardTemplate]',
  standalone: true,
})
export class CardTemplateDirective {
  constructor() {}
}
