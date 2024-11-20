import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Todo } from '../state/state.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="list-item">
      {{ todo().title }}
      <div class="list-item-buttons">
        <button [disabled]="isUpdating()" (click)="update.emit()">
          Update
        </button>
        <button [disabled]="isUpdating()" (click)="delete.emit()">
          Delete
        </button>
      </div>
    </div>
  `,
  styles: `
    .list-item {
      display: flex;
      width: 50%;
      padding: 5px;
      border: 1px solid #ccc;
      margin: 10px;
    }
    .list-item-buttons {
      margin-left: auto;

      & button {
        margin-left: 5px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  todo = input.required<Todo>();
  isUpdating = input<boolean>();
  update = output<void>();
  delete = output<void>();
}
