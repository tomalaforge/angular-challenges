import { NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, contentChild, input } from '@angular/core';

@Component({
  selector: 'table',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <thead>
      <ng-container *ngTemplateOutlet="headerTemplate()"></ng-container>
    </thead>
    @for (item of items(); track $index) {
      <tbody>
        <ng-container
          *ngTemplateOutlet="
            bodyTemplate();
            context: { $implicit: item }
          "></ng-container>
      </tbody>
    }
  `,
})
export class TableComponent<T> {
  items = input.required<T[]>();

  headerTemplate = contentChild.required('header', {
    read: TemplateRef,
  });

  bodyTemplate = contentChild.required('body', { read: TemplateRef });
}
