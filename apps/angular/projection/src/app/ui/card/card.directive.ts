import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appAppCard]',
  standalone: true,
})
export class CardDirective {
  constructor(private templateRef: TemplateRef<unknown>) {
    console.log(templateRef);
  }
}
