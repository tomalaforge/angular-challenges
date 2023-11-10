import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { CardImageDirective } from './card-image.directive';
import { CardItemDirective } from './card-item.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
})
export class CardComponent {
  @Input() list: any[] | null = null;

  @Output() add = new EventEmitter<void>();

  @ContentChild(CardImageDirective) cardImage!: CardImageDirective;
  @ContentChild(CardItemDirective) cardItem!: CardItemDirective;
}
