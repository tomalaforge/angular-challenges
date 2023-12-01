import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { CardListContentDefDirective } from './card-list-content-def.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Output() add = new EventEmitter<void>();

  @ContentChild(CardListContentDefDirective, { read: TemplateRef })
  templateRef!: TemplateRef<{ $implicit: T }>;
}
