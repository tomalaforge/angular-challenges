import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-list-item',
  template: `
    <li class="flex items-center justify-between border-b border-gray-200 py-4">
      <label class="flex items-center">
        <span>{{ todo().title }}</span>
        @if (disabled()) {
          <mat-spinner [diameter]="15"></mat-spinner>
        }
        @if (proccessedTodoId() === todo().id) {
          <span class="ps-1 text-red-600">{{ errorMessage() }}</span>
        }
      </label>
      <div>
        <button
          class="delete-btn mr-2 text-red-500 hover:text-red-700"
          (click)="delete.emit()"
          [disabled]="disabled()">
          Delete
        </button>
        <button
          class="edit-btn text-blue-500 hover:text-blue-700"
          (click)="update.emit()"
          [disabled]="disabled()">
          Update
        </button>
      </div>
    </li>
  `,
  standalone: true,
  imports: [MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListItemComponent {
  todo = input.required<Todo>();
  proccessedTodoId = input.required<number | undefined>();
  errorMessage = input.required<string | undefined>();

  disabled = computed(
    () => this.proccessedTodoId() === this.todo().id && !this.errorMessage(),
  );

  delete = output<void>();
  update = output<void>();
}
