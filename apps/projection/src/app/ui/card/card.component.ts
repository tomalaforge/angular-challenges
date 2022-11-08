import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../model/item.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  styleUrls: ['./card.component.scss'],
  imports: [NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() items: Item[] = [];
  @Input() customClass = '';
  @Output() _addNewItem = new EventEmitter();
  @Output() _deleteItem = new EventEmitter<number>();
}
