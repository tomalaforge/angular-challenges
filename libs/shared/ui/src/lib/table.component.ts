import { Component, contentChild, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'table',
  imports: [],
  template: `
    <thead>
      <ng-container *ngTemplateOutlet="headerTemplate()"></ng-container>
    </thead>
    @for (item of items(); track $index) {
      <tbody>
        <ng-container
          *ngTemplateOutlet="bodyTemplate(); context: { $implicit: item }" />
      </tbody>
    }
  `,
})
export class TableComponent<T> {
  items = input.required<T[]>();

  headerTemplate = contentChild.required('header', { read: TemplateRef });
  bodyTemplate = contentChild.required('body', { read: TemplateRef });
}
