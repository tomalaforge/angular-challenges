import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [CommonModule, ListItemComponent],
  host: {
    class: 'm-4 flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Output() addNew = new EventEmitter();

  addNewItem() {
    this.addNew.emit();
  }
}
