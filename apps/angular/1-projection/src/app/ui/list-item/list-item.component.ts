import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-list-item',
  template: `
    @if (type() === CardType.TEACHER || type() === CardType.STUDENT) {
      {{ item().firstName }}
    } @else if (type() === CardType.CITY) {
      {{ item().name }}
    }

    <button (click)="onDelete(item().id)">
      <img class="h-5" src="assets/svg/trash.svg" />
    </button>
  `,
  host: { class: 'border-grey-300 flex justify-between border px-2 py-1' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  readonly item = input.required<any>();
  readonly type = input.required<CardType>();

  readonly deleteItem = output<number>();

  CardType = CardType;

  onDelete(id: number) {
    this.deleteItem.emit(id);
  }
}
