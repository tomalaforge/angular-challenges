import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';
import { CardTemplateContentDirective } from './card-template-content.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ListItemComponent,
    NgTemplateOutlet,
    CardTemplateContentDirective,
  ],
  styles: [
    `
      :host > div {
        background-color: var(--card-bg-color);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';

  @Output() addItemEvent: EventEmitter<void> = new EventEmitter<void>();

  CardType = CardType;

  @ContentChild(CardTemplateContentDirective)
  template!: CardTemplateContentDirective;

  constructor() {}

  addNewItem() {
    this.addItemEvent.emit();
  }
}
