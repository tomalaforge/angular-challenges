import { Component, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { ItemComponent } from './item.component';
import { TodosApiService } from './todos-api.service';

@Component({
  standalone: true,
  imports: [ItemComponent],
  selector: 'app-root',
  template: `
    @if (todosQuery.isPending()) {
      Loading...
    } @else if (todosQuery.isError()) {
      Error: {{ todosQuery.error().message }}
    }
    @if (todosQuery.data(); as todos) {
      @for (todo of todos; track todo.id) {
        <app-item [todo]="todo" />
      }
    }
  `,
})
export class AppComponent {
  #api = inject(TodosApiService);

  todosQuery = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => lastValueFrom(this.#api.getAllTodos$()),
  }));
}
