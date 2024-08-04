import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content></ng-content>
      <section>
        <app-list-item
          *ngFor="let item of list"
          [itemTemplate]="itemTemplate"
          [deleteItem]="deleteItem(item.id)"
          [item]="item"></app-list-item>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgFor, CommonModule, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';
  @Input() itemTemplate: TemplateRef<any> | null = null;
  @Input() addNewItem: any;
  @Input() deleteItem: any;
}
