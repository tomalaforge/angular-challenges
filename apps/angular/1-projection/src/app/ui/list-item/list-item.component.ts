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
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ firstName() }} {{ lastName() }}
      {{ name() }}
      <button (click)="onDelete()">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  readonly id = input.required<number>();
  readonly type = input<CardType>();
  readonly name = input<string>();
  readonly firstName = input<string>('');
  readonly lastName = input<string>('');
  deleteItem = output<number>();

  onDelete() {
    this.deleteItem.emit(this.id());
  }
}
