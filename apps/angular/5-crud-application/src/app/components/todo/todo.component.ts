import { Component, input, output } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Todo } from '../../todo';

@Component({
  selector: 'app-todo',
  template: `
    <div class="container">
      <span data-testid="todo-item">{{ todo().title }}</span>
      @if (isProccessing()) {
        <span class="inline-spinner">
          <mat-spinner
            [diameter]="16"
            [attr.data-testid]="'todo-spinner-' + todo().id" />
        </span>
      }
      <button
        data-testid="update-btn"
        (click)="update(todo())"
        [disabled]="isProccessing()">
        Update
      </button>
      <button
        data-testid="delete-btn"
        (click)="remove(todo().id)"
        [disabled]="isProccessing()">
        Delete
      </button>
    </div>
  `,
  imports: [MatProgressSpinnerModule],
  styles: `
    .container {
      display: flex;
    }

    .inline-spinner {
      display: inline-flex;
      vertical-align: middle;
      margin-left: 4px;
    }
  `,
})
export class TodoComponent {
  todo = input.required<Todo>();
  isProccessing = input(false);
  onUpdate = output<Todo>();
  onRemove = output<number>();

  update(todo: Todo) {
    this.onUpdate.emit(todo);
  }

  remove(id: number) {
    this.onRemove.emit(id);
  }
}
