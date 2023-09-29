import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CardRowDirective } from '../../directive/card-row/card-row.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgFor, NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input({ required: true }) list: T[] = [];
  @ContentChild(CardRowDirective, { read: TemplateRef }) row:
    | TemplateRef<any>
    | undefined;
  @Output() addItem = new EventEmitter<void>();
}
