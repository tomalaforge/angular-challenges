import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content #image></ng-content>
      <section>
        @for (item of list; track item.id) {
          <app-list-item
            [id]="item.id"
            [item]="item"
            [getName]="getName"
            [deleteItem]="deleteItem"></app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';
  @Input() getName!: (item: any) => string;
  @Input() deleteItem!: (id: number) => void;
  @Input() addNewItem!: () => void;
}
