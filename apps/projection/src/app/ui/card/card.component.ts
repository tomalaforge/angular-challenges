import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { Item } from '../../model/item.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  styleUrls: ['./card.component.scss'],
  imports: [NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  @Input() items: Item[] | null = [];
  @Input() customClass = '';

  @Output() addNewItem = new EventEmitter();

  @ContentChild('listItemRef', { read: TemplateRef })
  listItemTemplate!: TemplateRef<ListItemComponent>;
}
