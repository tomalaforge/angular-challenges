import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from './item';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border border-grey-300 py-1 px-2 flex justify-between">
      {{ item.name }}
      <button (click)="delete.emit()">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  @Input() item!: Item;
  @Output('delete') delete = new EventEmitter();
}
