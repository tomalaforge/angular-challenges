import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoStore {
  private http = inject(HttpClient);
  private _todos = signal<Todo[]>([]);
  todos = computed(this._todos);

  constructor() {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this._todos.set(todos);
      });
  }

  update(todo: Todo) {
    this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          body: todo.title,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe((todoUpdated: Todo) => {
        this._todos.update((value) => [
          ...value.filter((t) => t.id < todoUpdated.id),
          todoUpdated,
          ...value.filter((t) => t.id > todoUpdated.id),
        ]);
      });
  }

  delete(id: number) {
    this.http
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe(() => {
        this._todos.update((value) => [...value.filter((t) => t.id != id)]);
      });
  }
}
