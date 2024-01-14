import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-todo-item',
  template: `
    <div class="todo-item">
      <div class="todo-content">
        @if (isProcessing) {
          <mat-spinner [diameter]="16"></mat-spinner>
        } @else {
          <span>{{ title }}</span>
        }
      </div>
      <div class="todo-action">
        <button
          class="update-btn"
          [disabled]="isProcessing"
          (click)="update.emit()">
          Update
        </button>
        <button
          class="delete-btn"
          [disabled]="isProcessing"
          (click)="delete.emit()">
          Delete
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .todo-item {
        display: flex;
      }
    `,
  ],
  imports: [MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() title!: string;
  @Input() isProcessing: boolean = false;
  @Output() update = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
}
