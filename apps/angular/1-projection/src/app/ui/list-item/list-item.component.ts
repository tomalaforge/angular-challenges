import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Output,
} from '@angular/core';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="list-item">
      <span class="item-name">{{ name() }}</span>
      <button class="delete-btn" (click)="onDelete()">
        <img
          class="h-5 w-5 opacity-60 transition-opacity hover:opacity-100"
          src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  styles: [
    `
      .list-item {
        @apply flex items-center justify-between rounded-md bg-white p-3;
        @apply border border-gray-100 transition-colors hover:bg-gray-50;
      }
      .item-name {
        @apply font-medium text-gray-700;
      }
      .delete-btn {
        @apply rounded-full p-2 transition-colors hover:bg-red-50;
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  readonly id = input.required<number>();
  readonly name = input.required<string>();
  readonly type = input.required<CardType>();

  @Output() delete = new EventEmitter<void>();

  onDelete() {
    this.delete.emit();
  }
}
