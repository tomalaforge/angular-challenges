import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Todo } from '../interfaces/todo.interface';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  get(): Observable<Todo[]> {
    // Added 1s fake delay
    return this.http.get<Todo[]>(BASE_URL).pipe(delay(1000));
  }

  update(todo: Todo) {
    const headerOption = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };

    return this.http.put<Todo>(
      `${BASE_URL}/${todo.id}`,
      JSON.stringify(todo),
      headerOption,
    );
  }

  delete(todoId: number) {
    return this.http.delete(`${BASE_URL}/${todoId.toString()}`);
  }
}
