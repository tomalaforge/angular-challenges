import { inject, Injectable } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { TodosService } from '../todos.service';

@Injectable({
  providedIn: 'root',
})
export class TodoStore {
  private service = inject(TodosService);
  todos = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => this.service.getTodos(),
  }));
}
