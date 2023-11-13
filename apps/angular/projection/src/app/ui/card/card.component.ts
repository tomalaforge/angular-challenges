import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { RowRefDirective } from '../../directives/rowref.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgFor, ListItemComponent, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
})
export class CardComponent<T> {
  @ContentChild(RowRefDirective, { read: TemplateRef })
  rowTemplate!: TemplateRef<{
    $implicit: T;
  }>;

  @Input() list: T[] = [];

  @Output() addItem: EventEmitter<unknown> = new EventEmitter();

  addNewItem() {
    this.addItem.next(null);
  }
}
