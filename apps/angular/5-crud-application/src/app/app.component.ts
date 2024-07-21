import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodosService } from './todos.service';

@Component({
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  selector: 'app-root',
  template: `
    @if (todos.isLoading()) {
      <p>Loading...</p>
    }
    @if (todos.error()) {
      <p>Error while fetching todos: {{ todos.error()!.message }}</p>
    }
    @if (todos.data()) {
      <ul [class.loading]="todos.isFetching()">
        @for (todo of todos.data(); track todo.id) {
          <app-todo-item [todo]="todo" />
        }
      </ul>
    }
  `,
  styles: `
    .loading {
      color: #a6a6a6;
    }
  `,
})
export class AppComponent {
  private service = inject(TodosService);
  todos = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => this.service.getTodos(),
  }));
}
