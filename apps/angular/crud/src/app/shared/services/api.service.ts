import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  #http = inject(HttpClient);

  getTodos(): Observable<Todo[]> {
    return this.#http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  update({ id, body, userId }: Todo): Observable<Todo> {
    return this.#http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      JSON.stringify({ id, body, userId, title: randText() }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  delete({ id }: Todo): Observable<void> {
    return this.#http.delete<void>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    );
  }
}
