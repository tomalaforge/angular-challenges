import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  Input,
  Output,
  TemplateRef,
  EventEmitter,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Directive({
  selector: '[card-list-item]',
  standalone: true,
})
export class CardListItem {}
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet, ListItemComponent],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';
  @Output() added: EventEmitter<void> = new EventEmitter<void>();
  @ContentChild(CardListItem, { read: TemplateRef })
  cardListItem!: TemplateRef<{ $implicit: T }>;

  CardType = CardType;
}
