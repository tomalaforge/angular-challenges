import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() deleteCallback?: (id: number) => void;
  @Input() customClass = '';

  deleteEvent(id: number) {
    if (this.deleteCallback) {
      this.deleteCallback(id);
    }
  }
}
