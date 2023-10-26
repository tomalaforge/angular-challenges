import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  @Input() customClass = '';
  @ContentChild('listItemTemplate', { read: TemplateRef })
  listItemTemplate!: TemplateRef<ListItemComponent>;
}
