import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { ITodo } from './ITodo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  #todos = signal<ITodo[]>([]);
  todos = computed(this.#todos);

  http = inject(HttpClient);

  public getTodos(): void {
    this.http
      .get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => this.#todos.set(todos));
  }

  updateTodo(todo: ITodo): void {
    this.http
      .put<ITodo>(
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
        },
      )
      .subscribe((updated: ITodo) => {
        this.#todos.update((todos) =>
          todos.map((todo) => (todo.id === updated.id ? updated : todo)),
        );
      });
  }

  deleteTodo(id: number) {
    this.http
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe(() => {
        this.#todos.update((todos) => todos.filter((todo) => todo.id !== id));
      });
  }
}
