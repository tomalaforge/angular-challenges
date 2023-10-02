import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ListItemTemplateDirective } from '../../directives/list-item-template.directive';
import { BaseItem } from '../../types/base-item';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet],
  styles: [
    `
      .card {
        background-color: var(--card-background-color, transparent);
      }
    `,
  ],
})
export class CardComponent {
  @Input() list: BaseItem[] = [];
  @Input() imageUrl!: string;

  @ContentChild(ListItemTemplateDirective)
  itemTemplate?: ListItemTemplateDirective;

  @Output()
  addNewItem: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  deleteItem: EventEmitter<number> = new EventEmitter<number>();

  trackById(index: number, item: BaseItem) {
    return item.id;
  }
}
