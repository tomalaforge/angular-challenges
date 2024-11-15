import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo.models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/todos';
  private readonly headers = new HttpHeaders().set(
    'Content-Type',
    'application/json; charset=UTF-8',
  );

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      `${this.baseUrl}/${todo.id}`,
      {
        id: todo.id,
        title: todo.title,
        body: todo.body,
        userId: todo.userId,
      },
      { headers: this.headers },
    );
  }

  deleteTodo(todo: Todo): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${todo.id}`);
  }
}
