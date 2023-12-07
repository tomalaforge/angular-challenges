import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  ElementRef,
  Input,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input({ required: true }) list: T[] | null = null;

  @Input() customClass = '';

  @ContentChild('cardButtons')
  buttonState: TemplateRef<ElementRef> | null = null;

  @ContentChild('cardContent')
  cardContent: TemplateRef<{ $implicit: T }> | null = null;
}
