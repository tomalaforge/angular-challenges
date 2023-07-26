import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, JsonPipe],
})
export class CardComponent<T extends { id: number; [key: string]: any }> {
  @Input() list: T[] | null = null;
  @Input({ required: true }) removeStore!: (id: number) => void;
  @Input({ required: true }) addOneStore!: (t: T) => void;
  @Input({ required: true }) addRandom!: () => T;
  @Input() customClass = '';
  @Input({ required: true }) label!: string;

  addNewItem() {
    this.addOneStore(this.addRandom());
  }
}
