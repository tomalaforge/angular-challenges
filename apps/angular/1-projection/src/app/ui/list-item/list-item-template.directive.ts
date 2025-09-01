import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[listItemTemplate]',
  standalone: true,
})
export class ListItemTemplateDirective<T> {
  readonly templateRef = inject(TemplateRef);

  listItemTemplate = input.required<T[]>();
}
