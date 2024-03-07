import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Signal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Todo, UpdatedTodo } from './app.model';

import { injectMutation } from '@tanstack/angular-query-experimental';

import { TodoService } from './app.service';
import { todoKeys } from './keys/app.keys';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-todo-item',
  template: `
    <div>
      @if (updateMutation.isError()) {
        <div>Error: {{ updateMutation.error() }}</div>
      } @else if (deleteMutation.isError()) {
        <div>Error: {{ deleteMutation.error() }}</div>
      } @else {
        {{ todoSignal()?.title }}
        <button (click)="update(todoSignal()!)" [disabled]="isLoading()">
          Update
        </button>
        <button (click)="delete(todoSignal()!)" [disabled]="isLoading()">
          Delete
        </button>
        @if (isLoading()) {
          <mat-spinner [diameter]="40"></mat-spinner>
        }
      }
    </div>
  `,
  styles: [],
})
export class ItemComponent {
  todoSignal = signal<Todo | undefined>(undefined);

  isLoading: Signal<boolean> = computed(
    () => this.updateMutation.isPending() || this.deleteMutation.isPending(),
  );

  @Input() set todo(todo: Todo) {
    this.todoSignal.set(todo);
  }

  private todoService = inject(TodoService);

  updateMutation = injectMutation((client) => ({
    mutationFn: (todo: Todo) => this.todoService.updateTodo(todo.id),
    onSuccess: (todoUpdated: UpdatedTodo) => {
      client.setQueryData(todoKeys.all, (todos: Todo[]) => {
        return todos.map((t) => {
          if (t.id !== todoUpdated.id) {
            return t;
          } else {
            return {
              ...t,
              title: todoUpdated.title,
            };
          }
        });
      });
    },
  }));

  update(todo: Todo) {
    this.updateMutation.mutate(todo);
  }

  deleteMutation = injectMutation((client) => ({
    mutationFn: (todo: Todo) => this.todoService.deleteTodo(todo.id),
    onSuccess: (_, todo: Todo) => {
      client.setQueryData(todoKeys.all, (todos: Todo[]) => {
        return todos.filter((t) => t.id !== todo.id);
      });
    },
  }));

  delete(todo: Todo) {
    this.deleteMutation.mutate(todo);
  }
}
