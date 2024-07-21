import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private BASE_URL = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.BASE_URL);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      `${this.BASE_URL}/${todo.id}`,
      JSON.stringify({
        ...todo,
        title: randText(),
      } satisfies Todo),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
