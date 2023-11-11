import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Store } from '../../data-access/store';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgFor, ListItemComponent],
})
export class CardComponent<T extends { id: number }> {
  @Input({ required: true }) store!: Store;
  @Input({ required: true }) getName!: (item: T) => string;

  @Input() list: T[] = [];
  @Input() customClass = '';

  addNewItem() {
    this.store.addRandom();
  }

  delete(person: T) {
    this.store.deleteOne(person.id);
  }
}
