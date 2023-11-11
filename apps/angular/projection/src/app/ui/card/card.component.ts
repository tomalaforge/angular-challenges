import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
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

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T extends { id: number }> {
  @Input() list: T[] | null = null;

  @Input() customClass = '';

  @Output() deleteItem = new EventEmitter<number>();

  @Output() addItem = new EventEmitter();

  @ContentChild(TemplateRef, { static: true }) templateRef: TemplateRef<{
    item: T;
  }> | null = null;

  delete(id: number) {
    this.deleteItem.emit(id);
  }

  addNewItem() {
    this.addItem.emit();
  }
}
