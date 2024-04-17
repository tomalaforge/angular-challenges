import { Directive, input } from '@angular/core';

type ItemContext<T> = { $implicit: T };

@Directive({
  selector: 'ng-template[listItem]',
  standalone: true,
})
export class NgTemplateListItemDirective<T> {
  /** Infer type-information from the given list to provide a type-safe API. */
  infer = input.required<T[]>();

  static ngTemplateContextGuard<TContext>(
    directive: NgTemplateListItemDirective<TContext>,
    context: unknown,
  ): context is ItemContext<TContext> {
    return true;
  }
}
