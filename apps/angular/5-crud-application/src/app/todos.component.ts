import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { TodoItemComponent } from './todo-item.component';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todos',
  template: `
    <h1>Todos</h1>
    @if (query.isPending()) {
      <p>Loading...</p>
    }
    @if (query.isError()) {
      <p>Error: {{ query.error().message }}</p>
    }
    @if (query.data(); as data) {
      <div
        style="display: flex; flex-direction: column; padding: 12px; gap:8px">
        @for (todo of query.data(); track todo.id) {
          <app-todo-item [todo]="todo"></app-todo-item>
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
})
export class TodosComponent {
  private todoServiec = inject(TodoService);

  query = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => lastValueFrom(this.todoServiec.getTodos()),
  }));
}
