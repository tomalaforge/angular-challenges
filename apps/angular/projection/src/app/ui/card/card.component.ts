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
  @Input() nameAttr = '';

  @Output() delete = new EventEmitter<number>();
  @Output() add = new EventEmitter();

  addNewItem() {
    this.add.emit();
  }

  deleteItem(id: number) {
    this.delete.emit(id);
  }
}
