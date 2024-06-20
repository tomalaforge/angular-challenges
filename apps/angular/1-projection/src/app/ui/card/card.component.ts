import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';
  @Output() addItem: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteItem: EventEmitter<number> = new EventEmitter<number>();

  onAddItem() {
    this.addItem.emit();
  }

  onDeleteItem(id: number) {
    this.deleteItem.emit(id);
  }
}
