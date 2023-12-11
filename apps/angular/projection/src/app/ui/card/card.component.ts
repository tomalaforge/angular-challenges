import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CardItemContentDirective } from './card-item-content.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class CardComponent<T extends { id: number }> {
  @Input() list: T[] | undefined = [];

  @Output() addItem = new EventEmitter<void>();

  @ContentChild(CardItemContentDirective)
  cardItemContent!: CardItemContentDirective;

  addNewItem() {
    this.addItem.emit();
  }
}
