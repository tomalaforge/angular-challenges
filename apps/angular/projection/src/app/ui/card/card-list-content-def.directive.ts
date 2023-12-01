import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[cardListContentDef]',
  standalone: true,
})
export class CardListContentDefDirective<T> {
  // Pass the list in order to provide type safety for the context
  @Input() cardListContentDefList: T[] | null = null;

  static ngTemplateContextGuard<T>(
    directive: CardListContentDefDirective<T>,
    context: unknown,
  ): context is { $implicit: T } {
    return true;
  }
}
