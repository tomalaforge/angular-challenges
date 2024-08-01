import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  #http = inject(HttpClient);
  #baseUrl = 'https://jsonplaceholder.typicode.com';

  getAll(): Observable<Todo[]> {
    return this.#http.get<Todo[]>(`${this.#baseUrl}/todos`);
  }

  update(todo: Todo): Observable<Todo> {
    return this.#http.put<Todo>(
      `${this.#baseUrl}/todos/${todo.id}`,
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
    );
  }

  delete(id: number) {
    return this.#http.delete(`${this.#baseUrl}/todos/${id}`);
  }
}
