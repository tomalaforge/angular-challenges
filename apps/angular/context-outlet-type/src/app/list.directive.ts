import { Directive, Input } from '@angular/core';

interface ListContext<T> {
  $implicit: T;
  appList: T;
  index: number;
}

@Directive({
  selector: 'ng-template[appList]',
  standalone: true,
})
export class ListDirective<T> {
  @Input() appList!: T[];

  static ngTemplateContextGuard<TContext>(
    dir: ListDirective<TContext>,
    ctx: unknown,
  ): ctx is ListContext<TContext> {
    return true;
  }
}
