import { Directive } from '@angular/core';

export interface PersonTemplateContext {
  $implicit: string; //person name
  age: number;
}

@Directive({
  selector: '[personContext]',
  standalone: true,
})
export class PersonDirective {
  static ngTemplateContextGuard(
    _dir: PersonDirective,
    ctx: PersonTemplateContext,
  ): ctx is PersonTemplateContext {
    return true;
  }
}
