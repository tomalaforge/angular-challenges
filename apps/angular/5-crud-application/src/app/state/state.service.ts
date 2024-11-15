import { inject, Injectable, signal } from '@angular/core';
import { RestService } from '../rest.service';

export interface Todo {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private readonly restService = inject(RestService);

  todos = signal<Todo[]>([]);
  isLoading = signal<boolean>(false);

  fetchData(): void {
    this.isLoading.set(true);
    this.restService.fetchData().subscribe((todos) => {
      this.todos.set(todos);
      this.isLoading.set(false);
    });
  }

  update(todo: Todo) {
    this.restService.update(todo).subscribe((todoUpdated: Todo) => {
      this.todos.update((todos) => {
        const index = todos.findIndex((t) => t.id === todoUpdated.id);
        todos[index] = todoUpdated;
        return todos;
      });
    });
  }

  delete(todo: Todo) {
    this.restService.delete(todo).subscribe(() => {
      this.todos.update((todos) => todos.filter((t) => t.id !== todo.id));
    });
  }
}
