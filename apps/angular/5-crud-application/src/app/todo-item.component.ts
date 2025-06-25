import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  injectMutation,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { Todo } from '../model/todo';
import { todoKeys } from './todo.factory';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo-item',
  imports: [MatProgressSpinnerModule],
  template: `
    @if (updateTodo.isPending() || deleteTodo.isPending()) {
      <mat-spinner [diameter]="20" color="blue" />
    }
    @if (updateTodo.isError()) {
      An error has occured: {{ updateTodo.error() }}
    }
    @if (deleteTodo.isError()) {
      An error has occured: {{ deleteTodo.error() }}
    }
    @if (todoSignal() && !updateTodo.isPending() && !deleteTodo.isPending()) {
      {{ todoSignal()!.title }}
      <button (click)="updateTodos(todoSignal()!.id)">Update</button>
      <button (click)="deleteTodos(todoSignal()!.id)">Delete</button>
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
  standalone: true,
})
export class TodoItemComponent {
  //Cach 1
  todoSignal: WritableSignal<Todo | undefined> = signal(undefined);

  @Input({ required: true }) set todo(todo: Todo) {
    this.todoSignal.set(todo);
  }
  queryClient = inject(QueryClient);

  constructor(private todoService: TodoService) {}

  updateTodo = injectMutation(() => ({
    mutationFn: (todoId: number) => {
      return lastValueFrom(this.todoService.updateTodo(todoId));
    },
    onSuccess: (data) => {
      this.queryClient.setQueryData(todoKeys.all, (oldTodos: Todo[]) => {
        return oldTodos
          ? oldTodos.map((t) => (t.id === data.id ? data : t))
          : oldTodos;
      });
    },
    onSettled: (data, error, variables, context) => {
      const todos: Todo[] | undefined = this.queryClient.getQueryData(
        todoKeys.all,
      );
      if (todos) {
        console.log(todos[variables]);
      }
    },
  }));

  deleteTodo = injectMutation(() => ({
    mutationFn: (todoId: number) => {
      return lastValueFrom(this.todoService.deleteTodo(todoId));
    },
    onSuccess: (_, variable) => {
      this.queryClient.setQueryData(todoKeys.all, (oldTodos: Todo[]) => {
        return oldTodos ? oldTodos.filter((t) => t.id !== variable) : oldTodos;
      });
    },
    onSettled: (data, error, variables, context) => {
      console.log(this.queryClient.getQueryData(todoKeys.all));
    },
  }));

  updateTodos(todoId: number) {
    this.updateTodo.mutate(todoId);
  }

  deleteTodos(todoId: number) {
    this.deleteTodo.mutate(todoId);
  }
}
