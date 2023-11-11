import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Store } from '../../data-access/store';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @Input({ required: true }) store!: Store;
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';

  CardType = CardType;

  addNewItem() {
    this.store.addRandom();
  }

  delete(item: { id: number }) {
    this.store.deleteOne(item.id);
  }
}
