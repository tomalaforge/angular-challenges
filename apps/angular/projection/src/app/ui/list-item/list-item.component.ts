import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, TemplateRef, output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: 'list-item.component.html',
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class ListItemComponent {
  onDeleteItem = output();

  @ContentChild('itemContentTemplate')
  itemContentTemplate!: TemplateRef<void>;

  deleteItem() {
    this.onDeleteItem.emit();
  }
}
