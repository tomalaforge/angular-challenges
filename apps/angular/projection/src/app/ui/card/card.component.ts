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
import { CardItemDirective } from './card-item.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: [
    ':host > div { background-color: var(--app-card-background-color); }',
  ],
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input() list: T[] = [];

  @Output() add = new EventEmitter<void>();

  @ContentChild(CardItemDirective, { read: TemplateRef })
  itemTemplate!: TemplateRef<{ $implicit: T }>;
}
