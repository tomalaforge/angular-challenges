import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="[image-header]"></ng-content>

      <section>
        @for (item of list; track item.id) {
          <app-list-item
            [name]="item[nameKey]"
            [id]="item.id"
            (deleteItem)="onDeleteItem($event)"></app-list-item>
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
  imports: [ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';
  @Input() nameKey = '';

  @Output() deleteItem = new EventEmitter();
  @Output() addItem = new EventEmitter();

  addNewItem() {
    this.addItem.emit();
  }

  onDeleteItem(id: number) {
    this.deleteItem.emit(id);
  }
}
