import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { delay, Observable } from 'rxjs';
import { Todo } from './state/todo.model';

const URL = 'https://jsonplaceholder.typicode.com/todos';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private http = inject(HttpClient);

  fetchData(): Observable<Todo[]> {
    return this.http.get<Todo[]>(URL).pipe(delay(1000));
  }

  update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      `${URL}/${todo.id}`,
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
    return this.http.delete(`${URL}/${id}`);
  }
}
