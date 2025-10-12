import { Component, input, output } from '@angular/core';
import { CardListItem } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="[card-img]"></ng-content>
    <section>
      @for (item of list(); track $index) {
        <app-list-item
          [name]="item.name"
          [id]="item.id"
          (deleteItemEvent)="handleDeleteItemEvent($event)" />
      }
    </section>
    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItem()">
      Add
    </button>
  `,
  imports: [ListItemComponent],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
})
export class CardComponent {
  list = input<CardListItem[]>([]);
  deleteItemEvent = output<number>();
  addNewItemEvent = output<void>();

  addNewItem() {
    this.addNewItemEvent.emit();
  }
  handleDeleteItemEvent(id: number) {
    this.deleteItemEvent.emit(id);
  }
}
