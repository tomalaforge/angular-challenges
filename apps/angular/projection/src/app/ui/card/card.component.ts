import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { CardButtonsDirective } from '../../dicertives/card-buttons.directive';
import { CardContentDirective } from '../../dicertives/card-content.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input({ required: true }) list: T[] = [];

  @Input() customClass = '';

  @ContentChild(CardButtonsDirective)
  cardButtonState: CardButtonsDirective | null = null;

  @ContentChild(CardContentDirective)
  cardContentState: CardContentDirective | null = null;
}
