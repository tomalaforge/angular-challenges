import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[cardContentTemplate]',
  standalone: true,
})
export class CardContentTemplateDirective<T> {
  constructor(public templateRef: TemplateRef<{ $implicit: T }>) {}
}
