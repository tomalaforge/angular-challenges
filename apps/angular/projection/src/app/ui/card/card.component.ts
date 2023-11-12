import { NgFor, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input } from '@angular/core';
import { ModelWithId } from '../../model/model-with-id.model';
import { ListItemComponent } from '../list-item/list-item.component';
import { CardContentDirective } from './card-content.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgFor, NgTemplateOutlet, ListItemComponent],
})
export class CardComponent<T extends ModelWithId> {
  @ContentChild(CardContentDirective)
  cardContentDirective!: CardContentDirective<T>;

  @Input() customClass = '';
}
