import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable, catchError, finalize, tap } from 'rxjs';

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
  private readonly loading = signal<boolean>(false);
  private readonly errorMessage = signal<string | null>(null);

  constructor(private readonly http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    this.loading.set(true);

    return this.http.get<Todo[]>(this.apiUrl).pipe(
      tap((data) => this.todos.set(data)),
      catchError((error) => this.handleError('Error fetching todos', error)),
      finalize(() => this.loading.set(false)),
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    this.loading.set(true);
    return this.http
      .put<Todo>(
        `${this.apiUrl}/${todo.id}`,
        JSON.stringify({ ...todo, title: randText() }),
        { headers: { 'Content-type': 'application/json; charset=UTF-8' } },
      )
      .pipe(
        tap((updatedTodo) => {
          this.todos.set([
            ...this.todos().filter(
              (filteredTodo) => filteredTodo.id !== updatedTodo.id,
            ),
            updatedTodo,
          ]);
        }),
        catchError((error) => this.handleError('Error updating todo', error)),
        finalize(() => this.loading.set(false)),
      );
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    this.loading.set(true);
    return this.http.delete<Todo>(`${this.apiUrl}/${todo.id}`).pipe(
      tap(() => {
        this.todos.set(
          this.todos().filter((filteredTodo) => filteredTodo.id !== todo.id),
        );
      }),
      catchError((error) => this.handleError('Error deleting todo', error)),
      finalize(() => this.loading.set(false)),
    );
  }

  private handleError(message: string, error: any): Observable<never> {
    console.error(message, error);
    this.errorMessage.set(message);
    throw error;
  }

  get todos$(): Signal<Todo[]> {
    return this.todos;
  }

  get loading$(): Signal<boolean> {
    return this.loading;
  }

  get errorMessage$(): Signal<string | null> {
    return this.errorMessage;
  }
}
