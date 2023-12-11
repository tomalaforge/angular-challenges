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
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';
  @Input() itemNameTemplate!: TemplateRef<string>;
  @Output() deleteItem = new EventEmitter<number>();

  delete(id: number) {
    this.deleteItem.emit(id);
  }
}
