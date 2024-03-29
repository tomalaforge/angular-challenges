import { Directive, input } from '@angular/core';

type ListItemContext<T> = { $implicit: T; item: T };

@Directive({
  selector: 'ng-template[listItem]',
  standalone: true,
})
export class ListItemDirective<T> {
  listItem = input<T>();
  static ngTemplateContextGuard<T>(
    _dir: ListItemDirective<T>,
    _ctx: unknown,
  ): _ctx is ListItemContext<T> {
    return true;
  }
}
