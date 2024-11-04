import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appListItemTemplate]',
  standalone: true,
})
export class ListItemTemplateDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
