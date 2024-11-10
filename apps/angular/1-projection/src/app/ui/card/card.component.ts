import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CardModel } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ListItemComponent],
})
export class CardComponent {
  list = input<CardModel[]>([]);
  customClass = input<string>('');
  addNewItem = output<void>();
  deleteItem = output<number>();
}
