import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { CardRowDirective } from './card-row.directive';

@Component({
  standalone: true,
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, NgTemplateOutlet, ListItemComponent],
  templateUrl: './card.component.html',
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
})
export class CardComponent<T> {
  @Input()
  list: T[] | null = null;

  @Output()
  add = new EventEmitter<void>();

  @ContentChild(CardRowDirective)
  row!: CardRowDirective<T>;
}
