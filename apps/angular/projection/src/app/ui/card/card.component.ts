import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, input, output } from '@angular/core';
import { CardHeaderTemplateDirective } from '../../directive/card-header-template.directive';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [NgTemplateOutlet, NgIf, NgFor, ListItemComponent],
})
export class CardComponent<T extends { id: number }> {
  list = input<T[] | null>(null);
  prop = input.required<keyof T>();
  customClass = input<string>('');

  onDeleteItem = output<number>();
  onAddItem = output();

  @ContentChild(CardHeaderTemplateDirective)
  headerTemplate?: CardHeaderTemplateDirective;

  addNewItem() {
    this.onAddItem.emit();
  }

  deleteItem(id: number) {
    this.onDeleteItem.emit(id);
  }
}
