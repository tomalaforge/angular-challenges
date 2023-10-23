import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border border-grey-300 py-1 px-2 flex justify-between">
      {{ name }}
      <button (click)="onDelete.emit(id)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Input() type!: CardType;
  @Output() onDelete = new EventEmitter();
}
