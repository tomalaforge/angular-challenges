import { NgFor, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'table',
  standalone: true,
  imports: [NgTemplateOutlet, NgFor],
  template: `
    <thead>
      <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
    </thead>
    <tbody *ngFor="let item of items">
      <ng-container
        *ngTemplateOutlet="
          bodyTemplate;
          context: { $implicit: item }
        "></ng-container>
    </tbody>
  `,
})
export class TableComponent<T> {
  @Input() items!: T[];

  @ContentChild('header', { read: TemplateRef })
  headerTemplate!: TemplateRef<void>;

  @ContentChild('body', { read: TemplateRef })
  bodyTemplate!: TemplateRef<{ $implicit: T }>;
}
