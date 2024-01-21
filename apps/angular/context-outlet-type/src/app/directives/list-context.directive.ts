import { Directive, Input } from '@angular/core';
import { ListContext } from '../models/list-context.interface';

@Directive({
  selector: 'ng-template[context]',
  standalone: true,
})
export class ListContextDirective<TItem> {
  @Input() context!: TItem[];

  static ngTemplateContextGuard<TContext>(
    dir: ListContextDirective<TContext>,
    ctx: unknown,
  ): ctx is ListContext<TContext> {
    return true;
  }
}
