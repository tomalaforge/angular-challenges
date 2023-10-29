import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[list-option-tmp]',
  standalone: true,
})
export class ListItemTemplateDirective {
  constructor(public template: TemplateRef<unknown>) {}
}
