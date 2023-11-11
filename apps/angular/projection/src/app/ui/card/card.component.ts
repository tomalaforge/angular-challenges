import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Store } from '../../data-access/store';
import { CardType } from '../../model/card.model';
import { Person } from '../../model/person.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgFor, ListItemComponent],
})
export class CardComponent {
  @Input({ required: true }) store!: Store;
  @Input() list: Person[] = [];
  @Input() customClass = '';

  CardType = CardType;

  addNewItem() {
    this.store.addRandom();
  }

  delete(person: Person) {
    this.store.deleteOne(person.id);
  }
}
