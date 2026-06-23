import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'table',
  imports: [NgTemplateOutlet],
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
