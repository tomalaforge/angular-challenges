import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appRowTemplate]',
  standalone: true,
})
export class RowTemplateDirective<T> {
  constructor() {}
}
