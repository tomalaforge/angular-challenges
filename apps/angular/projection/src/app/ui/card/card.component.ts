import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';
  @Input() addCallback?: () => void;

  addNewItem() {
    console.log(this.addCallback);
    if (this.addCallback) {
      this.addCallback();
    }
  }
}
