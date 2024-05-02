import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from './types';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly http = inject(HttpClient);
  readonly todos = signal<Todo[]>([]);

  constructor() {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this.todos.set(todos);
      });
  }

  update(todo: Todo) {
    this.http
      .put<Todo>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        ...todo,
        title: randText(),
      })
      .subscribe((todoUpdated: Todo) => {
        this.todos.update((todos) => {
          const index = todos.findIndex((t) => t.id === todoUpdated.id);
          return [
            ...todos.slice(0, index),
            todoUpdated,
            ...todos.slice(index + 1),
          ];
        });
      });
  }

  delete(todo: Todo) {
    this.http
      .delete<Todo>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
      .subscribe(() => {
        this.todos.update((todos) => {
          return todos.filter((t) => t.id !== todo.id);
        });
      });
  }
}
