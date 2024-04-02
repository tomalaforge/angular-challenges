import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  TemplateRef,
  input,
  output,
} from '@angular/core';

type ListItem = {
  id: number;
};

@Component({
  selector: 'app-list-item',
  templateUrl: 'list-item.component.html',
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class ListItemComponent<T extends ListItem> {
  item = input.required<T>();
  onDeleteItem = output<number>();

  @ContentChild('itemContentTemplate')
  itemContentTemplate!: TemplateRef<void>;

  delete(id: number) {
    this.onDeleteItem.emit(id);
  }
}
