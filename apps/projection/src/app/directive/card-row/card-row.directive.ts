import { Directive, Input } from '@angular/core';

interface Row<T extends object> {
  $implicit: T;
}
@Directive({
  selector: 'ng-template[appCardRow]',
  standalone: true,
})
export class CardRowDirective<T extends object> {
  @Input({ required: true }) appCardRow!: T[];

  static ngTemplateContextGuard<TContext extends object>(
    directive: CardRowDirective<TContext>,
    context: unknown
  ): context is Row<TContext> {
    return true;
  }
}
