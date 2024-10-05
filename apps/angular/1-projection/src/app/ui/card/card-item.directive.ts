import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[cardItem]',
  standalone: true,
})
export class CardItemDirective<T> {
  constructor(public templateRef: TemplateRef<{ $implicit: T }>) {}
}
