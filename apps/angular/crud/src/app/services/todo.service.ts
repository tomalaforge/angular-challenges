import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable, tap } from 'rxjs';
import { Store } from '../store';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  body: string;
  completed: boolean;
}
@Injectable()
export class TodoService {
  todos$: Observable<Todo[]> = this.http
    .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
    .pipe(tap((next: Todo[]) => this.store.set('todos', next)));

  constructor(
    private store: Store,
    private http: HttpClient,
  ) {}

  update(todo: Todo) {
    const updated = JSON.stringify({
      todo: todo.id,
      title: randText(),
      body: todo.body,
      userId: todo.userId,
    });

    this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        updated,
        { headers: { 'Content-type': 'application/json; charset=UTF-8' } },
      )
      .pipe(
        tap((next) => {
          let value = this.store.value['todos'];
          value = [
            ...value.map((todo: Todo) => (todo.id === next.id ? next : todo)),
          ];
          this.store.set('todos', value);
        }),
      )
      .subscribe();
  }

  delete(id: number) {
    this.http
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .pipe(
        tap(() => {
          let value = this.store.value['todos'];
          value = [...value.filter((todo) => todo.id !== id)];
          this.store.set('todos', value);
        }),
      )
      .subscribe();
  }
}
