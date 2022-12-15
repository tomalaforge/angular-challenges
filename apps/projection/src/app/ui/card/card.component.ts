import { CommonModule, NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgFor, ListItemComponent, CommonModule],
})
export class CardComponent<T extends { id: number }> {
  @Input() list!: Array<T>;
  @Input()
  cardTemplateRef!: TemplateRef<any>;
  @Input() customClass = '';
  @Output() addItem: EventEmitter<boolean> = new EventEmitter();
  @Output() deleteItem: EventEmitter<number> = new EventEmitter();

  constructor() {}

  addNewItem() {
    this.addItem.emit(true);
  }
  delete(id: number) {
    this.deleteItem.emit(id);
  }
}
