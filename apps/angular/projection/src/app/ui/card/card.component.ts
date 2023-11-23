import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
  styles: `
  :host > div {
    background-color: var(--card-background-color);
  }
  `,
})
export class CardComponent<T extends { id: number }> {
  @ContentChild('itemTemplate', { read: TemplateRef })
  itemTemplateRef!: TemplateRef<{ $implicit: T }>;

  @Input() list: T[] | null = null;

  @Output() add = new EventEmitter<void>();

  constructor() {}
}
