import { Directive } from '@angular/core';
import { PersonContextInterface } from '../models/person-context.interface';

@Directive({
  selector: 'ng-template[person]',
  standalone: true,
})
export class PersonContextDirective {
  static ngTemplateContextGuard(
    dir: PersonContextDirective,
    ctx: unknown,
  ): ctx is PersonContextInterface {
    return true;
  }
}
