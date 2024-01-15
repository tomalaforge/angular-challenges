import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-item',
  imports: [NgTemplateOutlet],
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name }}
      <ng-container
        [ngTemplateOutlet]="deleteTemplate"
        [ngTemplateOutletContext]="{ $implicit: id }"></ng-container>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Input() deleteTemplate!: TemplateRef<unknown>;

  constructor() {}
}
