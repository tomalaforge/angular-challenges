import { Directive, TemplateRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[listItem]',
})
export class ListItemDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
