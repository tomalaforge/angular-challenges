import { Directive, input } from '@angular/core';

interface RowItemTemplateContext<T> {
  $implicit: T;
}

@Directive({
  selector: 'ng-template[rowItem]',
  standalone: true,
})
export class RowItemDirective<T> {
  rowItem = input.required<T[]>();

  static ngTemplateContextGuard<T>(
    dir: RowItemDirective<T>,
    ctx: unknown,
  ): ctx is RowItemTemplateContext<T> {
    // The guard body is not used at runtime, and included only to avoid
    // TypeScript errors.
    return true;
  }
}
