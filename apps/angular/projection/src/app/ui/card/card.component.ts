import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';
  @ContentChild('listItem', { read: TemplateRef }) listItem: TemplateRef<{
    item: any;
  }> | null = null;
}
