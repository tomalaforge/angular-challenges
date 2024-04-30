import { Directive, input } from '@angular/core';

export interface ListTemplateContext<T> {
  $implicit: T;
  index: number;
}

@Directive({
  selector: '[listContext]',
  standalone: true,
})
export class ListDirective<T> {
  // The directive's generic type `T` will be inferred from the `listContext` type
  listContext = input.required<T[]>();

  // Narrow the type of the context using the generic type of the directive.
  static ngTemplateContextGuard<T>(
    _dir: ListDirective<T>,
    ctx: ListTemplateContext<T>,
  ): ctx is ListTemplateContext<T> {
    return true;
  }
}
