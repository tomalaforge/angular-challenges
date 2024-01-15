import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { CommonModule } from '@angular/common';
import { CardListItemDirective } from './card-list-item.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  standalone: true,
  imports: [ListItemComponent, CommonModule, CardListItemDirective],
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Output() addedItem = new EventEmitter<void>();
  @ContentChild(CardListItemDirective, { read: TemplateRef })
  rowTemplate!: TemplateRef<{ $implicit: any }>;

  addedNewItem() {
    this.addedItem.emit();
  }
}
