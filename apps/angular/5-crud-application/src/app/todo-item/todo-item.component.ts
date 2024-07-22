import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
} from '@angular/core';
import { DeleteTodoService } from '../mutations/delete-todo.service';
import { UpdateTodoService } from '../mutations/update-todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <li [class.pending]="isOperationInProgress()">
      {{ todo.title }}
      <button (click)="updateTodo()" [disabled]="isOperationInProgress()">
        Update
      </button>
      <button (click)="deleteTodo()" [disabled]="isOperationInProgress()">
        Delete
      </button>
    </li>
  `,
  styles: `
    .pending {
      color: #a6a6a6;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  private update: UpdateTodoService;
  private delete: DeleteTodoService;
  constructor() {
    this.update = new UpdateTodoService();
    this.delete = new DeleteTodoService();
  }
  isOperationInProgress = computed(
    () => this.update.isPending() || this.delete.isPending(),
  );

  updateTodo() {
    this.update.mutate(this.todo);
  }
  deleteTodo() {
    this.delete.mutate(this.todo.id);
  }
}
