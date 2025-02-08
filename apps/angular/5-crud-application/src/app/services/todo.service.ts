import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  public get apiUrl() {
    return this._apiUrl;
  }
  public set apiUrl(value) {
    this._apiUrl = value;
  }
  private readonly todos = signal<Todo[]>([]);

  constructor(private readonly http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl).pipe(
      tap((data) => this.todos.set(data)),
      catchError((error) => {
        console.error('Error fetching todos', error);
        throw error;
      }),
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      `${this.apiUrl}/${todo.id}`,
      { ...todo },
      { headers: { 'Content-type': 'application/json; charset=UTF-8' } },
    );
  }

  get todos$(): Signal<Todo[]> {
    return this.todos;
  }
}
