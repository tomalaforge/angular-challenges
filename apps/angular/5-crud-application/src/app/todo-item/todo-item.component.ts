import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
} from '@angular/core';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { Todo } from '../todo';
import { TodosService } from '../todos.service';

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
  private service = inject(TodosService);
  update = injectMutation<Todo, Error, Todo>((client) => ({
    mutationFn: (todo: Todo) => this.service.updateTodo(todo),
    onSuccess(data) {
      client.setQueryData<Todo[]>(['todos'], (prev) =>
        prev?.map((t) => (t.id === data.id ? data : t)),
      );
    },
  }));
  delete = injectMutation<void, Error, number>((client) => ({
    mutationFn: (todoId) => this.service.deleteTodo(todoId),
    onSuccess(_, todoId) {
      client.setQueryData<Todo[]>(['todos'], (prev) =>
        prev?.filter((t) => t.id !== todoId),
      );
    },
  }));
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
