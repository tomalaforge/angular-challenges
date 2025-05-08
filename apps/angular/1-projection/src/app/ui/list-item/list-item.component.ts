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
      {{ name() }}
      <button (click)="onDeleteItem(this.id())">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
      <ng-content></ng-content>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  readonly id = input.required<number>();
  readonly name = input.required<string>();
  readonly type = input.required<CardType>();

  deleteItem = output<number>();

  onDeleteItem(id: number) {
    this.deleteItem.emit(id);
  }
}
