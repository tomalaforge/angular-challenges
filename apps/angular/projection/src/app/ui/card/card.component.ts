import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<T> {
  @ContentChild('genericTemplate', { static: true }) itemRef!: TemplateRef<{
    $implicit: T;
  }>;
  @Input() list: T[] = [];
  @Input() customClass = '';
  // @Input() itemRef!: TemplateRef<{ $implicit: T }>;
}
