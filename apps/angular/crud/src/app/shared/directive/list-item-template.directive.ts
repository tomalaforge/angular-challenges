import { Directive, TemplateRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[listItemContentTemplate]',
  standalone: true,
})
export class ListItemTemplateDirective {
  constructor(public templateRef: TemplateRef<void>) {}
}
