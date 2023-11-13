import { NgFor, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ModelWithId } from '../../model/model-with-id.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  host: {
    class: 'flex flex-col gap-3 p-4 border-2 border-black rounded-md w-fit',
  },
  imports: [NgFor, NgTemplateOutlet, ListItemComponent],
})
export class CardComponent<T extends ModelWithId> {
  @Input() items: T[] | null = null;

  @ContentChild('listItemRef', { read: TemplateRef })
  listItemRef!: TemplateRef<{ $implicit: T }>;
}
