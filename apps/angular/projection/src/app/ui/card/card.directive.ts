import { Directive, TemplateRef, inject } from '@angular/core';

export interface RowTemplateContext<T> {
  $implicit: T;
}

@Directive({
  selector: 'ng-template[template-row]',
  standalone: true,
})
export class CardDirective<T> {
  public readonly template: TemplateRef<RowTemplateContext<T>> =
    inject(TemplateRef);

  public static ngTemplateContextGuard<TContext>(
    _dir: CardDirective<TContext>,
    _ctx: unknown,
  ): _ctx is RowTemplateContext<TContext> {
    return true;
  }
}
