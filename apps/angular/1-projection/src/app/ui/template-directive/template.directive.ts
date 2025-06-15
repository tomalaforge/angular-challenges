import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTemplate]',
  standalone: true,
})
export class TemplateDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
