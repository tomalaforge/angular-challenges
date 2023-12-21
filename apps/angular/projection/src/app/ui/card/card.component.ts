import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent<T extends { id: number }> {
  @Input() list: T[] | null = null;

  @ContentChild('itemTemplate')
  itemTemplate!: TemplateRef<{ item: T }>;

  constructor() {}
}
