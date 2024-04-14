import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Todo } from './todo.model';
import { injectTodoDelete, injectTodoUpdate } from './todo.query';

@Component({
  standalone: true,
  imports: [MatProgressSpinnerModule],
  selector: 'app-todo-item',
  template: `
    @if (updateTodoQuery.isPending() || deleteTodoQuery.isPending()) {
      <mat-spinner [diameter]="20" color="blue" />
    }
    @if (updateTodoQuery.isError()) {
      An error has occured: {{ updateTodoQuery.error() }}
    }
    @if (deleteTodoQuery.isError()) {
      An error has occured: {{ deleteTodoQuery.error() }}
    }
    @if (
      todoSignal() &&
      !updateTodoQuery.isPending() &&
      !deleteTodoQuery.isPending()
    ) {
      {{ todoSignal()!.title }}
      <button (click)="update(todoSignal()!.id)">Update</button>
      <button (click)="delete(todoSignal()!.id)">Delete</button>
    }
  `,
  styles: [
    `
      :host {
        display: flex;
        gap: 3px;

        .error {
          color: red;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  todoSignal: WritableSignal<Todo | undefined> = signal(undefined);

  @Input({ required: true }) set todo(todo: Todo) {
    this.todoSignal.set(todo);
  }

  updateTodoQuery = injectTodoUpdate();

  deleteTodoQuery = injectTodoDelete();

  update(todoId: number) {
    this.updateTodoQuery.mutate(todoId);
  }

  delete(todoId: number) {
    this.deleteTodoQuery.mutate(todoId);
  }
}
