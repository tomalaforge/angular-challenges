import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, CommonModule],
})
export class CardComponent {
  @ViewChild(ListItemComponent, { static: true })
  childComponent: ListItemComponent;
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() addEvent = new EventEmitter();

  CardType = CardType;
  deleteItem(id: number) {
    this.deleteEvent.emit(id);
  }
  addNewItem() {
    this.addEvent.emit();
  }
}
