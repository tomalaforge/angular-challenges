import { Directive } from '@angular/core';

interface IPersonContext {
  $implicit: string;
  name: string;
  age: number;
}

@Directive({
  selector: 'ng-template[person]',
  standalone: true,
})
export class PersonDirective {
  static ngTemplateContextGuard(
    dir: PersonDirective,
    ctx: unknown,
  ): ctx is IPersonContext {
    return true;
  }
}
