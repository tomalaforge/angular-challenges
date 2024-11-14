import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { CardRowDirective } from './card-row.directive';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  imports: [ListItemComponent, NgClass, NgTemplateOutlet],
})
export class CardComponent<T extends { id: string }> {
  list = input<T[]>([]);
  addNewItem = output<void>();
  customClass = input<string>('');
  rowTemplate = contentChild.required(CardRowDirective, { read: TemplateRef });
}
