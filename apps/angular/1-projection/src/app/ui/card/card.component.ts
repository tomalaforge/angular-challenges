import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="[card-img]"></ng-content>
    <section>
      <app-list-item
        *ngFor="let item of list"
        [name]="getListItemName(item)"
        [id]="item.id"
        (deleteItemEvent)="handleDeleteItemEvent($event)"></app-list-item>
    </section>
    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItem()">
      Add
    </button>
  `,
  imports: [NgFor, ListItemComponent],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input({ required: true }) getListItemName!: (listItem: any) => string;
  @Output() deleteItemEvent = new EventEmitter<number>();
  @Output() addNewItemEvent = new EventEmitter<void>();

  addNewItem() {
    this.addNewItemEvent.emit();
  }
  handleDeleteItemEvent(id: number) {
    this.deleteItemEvent.emit(id);
  }
}
