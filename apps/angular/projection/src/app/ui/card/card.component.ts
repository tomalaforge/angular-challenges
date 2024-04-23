import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CardItem } from '../../model/card-item.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content></ng-content>
      <section>
        @for (item of list; track trackById) {
          <app-list-item
            [name]="item?.firstName ?? item?.name ?? ''"
            [id]="item.id"
            (delete)="itemDelete.emit(item.id)"></app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: CardItem[] | null = null;
  @Input() customClass = '';

  @Output() addNewItem = new EventEmitter();
  @Output() itemDelete = new EventEmitter<number>();

  trackById = (item: { id: string }) => item.id;
}
