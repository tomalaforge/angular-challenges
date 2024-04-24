import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[listItemTemplate]',
  standalone: true,
})
export class ListItemTemplateDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
