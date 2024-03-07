import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { Todo } from './app.model';
import { TodoService } from './app.service';
import { ItemComponent } from './item.component';
import { todoKeys } from './keys/app.keys';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, ItemComponent],
  selector: 'app-root',
  template: `
    @if (todos.isError()) {
      {{ todos.error() }}
    }
    @if (todos.isPending()) {
      <mat-spinner></mat-spinner>
    } @else {
      @for (todo of todos.data(); track todo.id) {
        <app-todo-item [todo]="todo"></app-todo-item>
      }
    }
  `,
  styles: [],
})
export class AppComponent {
  private todoService = inject(TodoService);

  todos = injectQuery(() => ({
    queryKey: todoKeys.all,
    queryFn: async (): Promise<Todo[]> => {
      return this.todoService.getTodos();
    },
  }));
}
