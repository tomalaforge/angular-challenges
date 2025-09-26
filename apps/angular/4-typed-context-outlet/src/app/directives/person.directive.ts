import { Directive, inject, TemplateRef } from '@angular/core';

interface PersonTemplateContext {
  $implicit: string;
  age: number;
}

@Directive({
  selector: 'ng-template[personTemplate]',
})
export class PersonDirective {
  private readonly tpl = inject<TemplateRef<PersonTemplateContext>>;

  static ngTemplateContextGuard(
    _dir: PersonDirective,
    ctx: unknown,
  ): ctx is PersonTemplateContext {
    return true;
  }
}
