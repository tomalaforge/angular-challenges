import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';

import { CardRowDirective } from './card-row.directive';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  standalone: true,
  imports: [NgTemplateOutlet],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T extends { id: number }> {
  items = input.required<T[]>();
  add = output<void>();

  rowTemplate = contentChild.required(CardRowDirective, {
    read: TemplateRef,
  });
}
