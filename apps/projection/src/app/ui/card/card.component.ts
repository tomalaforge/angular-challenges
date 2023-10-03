import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
  ContentChild,
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
  @Output() deleteEvent = new EventEmitter<void>();
  @Output() addEvent = new EventEmitter();
  @ContentChild('listView') listView: TemplateRef<any>;
  CardType = CardType;
  deleteItem() {
    this.deleteEvent.emit();
  }
  addNewItem() {
    this.addEvent.emit();
  }
}
