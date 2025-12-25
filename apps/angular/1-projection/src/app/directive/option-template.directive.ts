import { Directive } from '@angular/core';

@Directive({
  selector: '[appOptionTemplate]',
  exportAs: 'appOptionTemplate',
})
export class OptionTemplateDirective {
  constructor() {}
}
