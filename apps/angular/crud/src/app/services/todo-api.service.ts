import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { Todo } from '../models';

const TODOS_ENDPOINT = 'https://jsonplaceholder.typicode.com/todos';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  todos: WritableSignal<Todo[]> = signal([]);

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(TODOS_ENDPOINT);
  }

  update(todo: Todo): Observable<Todo> {
    const body = JSON.stringify({
      todo: todo.id,
      title: randText(),
      body: 'todo.body', // TODO: replace placeholder with content
      userId: todo.userId,
    });
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };

    return this.http.put<Todo>(`${TODOS_ENDPOINT}/${todo.id}`, body, {
      headers,
    });
  }

  delete(todo: Todo): Observable<void> {
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    return this.http.delete<void>(`${TODOS_ENDPOINT}/${todo.id}`, { headers });
  }
}
