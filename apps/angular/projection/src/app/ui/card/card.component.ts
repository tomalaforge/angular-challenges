import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="[image]"></ng-content>

    <ng-container *ngTemplateOutlet="itemLists; context: list"></ng-container>

    <ng-template #itemLists let-itemList="list">
      <app-list-item
        *ngFor="let item of list"
        [name]="item.firstName || item.name"
        [id]="item.id"
        (deleteItem)="onDeleteItem($event)"></app-list-item>
    </ng-template>

    <ng-content select="[addButton]"></ng-content>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, CommonModule],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';
  @Output() deleteItem = new EventEmitter<number>();

  constructor() {}

  onDeleteItem(id: number) {
    this.deleteItem.emit(id);
  }
}
