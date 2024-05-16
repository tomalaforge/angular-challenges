import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      'https://jsonplaceholder.typicode.com/todos/' + todo.id,
      JSON.stringify(todo),
    );
  }

  deleteTodo(todo: Todo): Observable<NonNullable<unknown>> {
    return this.http.delete<NonNullable<unknown>>(
      'https://jsonplaceholder.typicode.com/todos/' + todo.id,
    );
  }
}
