import { computed, Injectable, signal } from '@angular/core';
import { Todo } from './todo.model';
import { HttpClient } from '@angular/common/http';
import { randText } from '@ngneat/falso';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  #todos = signal<Todo[]>([]);
  todos = computed(this.#todos);

  constructor(private http: HttpClient) {}

  public getTodos(): void {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this.#todos.set(todos);
      });
  }

  public update(todo: Todo): void {
    this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )
      .subscribe((todoUpdated: Todo) => {
        this.#todos.update((todos) =>
          todos.map((todo) => (todo.id === todoUpdated.id ? todoUpdated : todo))
        );
      });
  }

  public delete(index: number): void {
    this.http
      .delete<void>(`https://jsonplaceholder.typicode.com/todos/${index}`)
      .subscribe((_) =>
        this.#todos.update((todos) => todos.filter((todo) => todo.id !== index))
      );
  }
}
