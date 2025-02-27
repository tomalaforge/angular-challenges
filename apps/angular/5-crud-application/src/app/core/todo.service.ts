import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';
import { Observable, catchError, finalize, of, tap, throwError } from 'rxjs';
import { Todo } from '../todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/todos';

  private _todos = signal<Todo[]>([]);
  private _loading = signal(false);
  private _error = signal<string>('');

  todos: Signal<Todo[]> = this._todos.asReadonly();
  loading: Signal<boolean> = this._loading.asReadonly();
  error: Signal<string> = this._error.asReadonly();

  constructor() {
    this.loadTodos();
  }

  loadTodos(): void {
    this._loading.set(true);
    this._error.set('');

    this.http
      .get<Todo[]>(this.baseUrl)
      .pipe(
        finalize(() => this._loading.set(false)),
        catchError((err) => {
          this.handleError('Failed to load todos', err);
          return of([]);
        }),
      )
      .subscribe((todos) => this._todos.set(todos));
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    this._loading.set(true);
    this._error.set('');

    return this.http
      .put<Todo>(`${this.baseUrl}/${updatedTodo.id}`, updatedTodo)
      .pipe(
        finalize(() => this._loading.set(false)),
        tap((updated) => {
          this._todos.update((todos) =>
            todos.map((t) => (t.id === updated.id ? updated : t)),
          );
        }),
        catchError((err) => this.handleError('Failed to update todo', err)),
      );
  }

  deleteTodo(id: number): Observable<void> {
    this._loading.set(true);
    this._error.set('');

    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      finalize(() => this._loading.set(false)),
      tap(() => {
        this._todos.update((todos) => todos.filter((t) => t.id !== id));
      }),
      catchError((err) => this.handleError('Failed to delete todo', err)),
    );
  }

  clearError(): void {
    this._error.set('');
  }

  createTodo(todo: Omit<Todo, 'id'>): Observable<Todo> {
    this._loading.set(true);
    this._error.set('');

    console.log(todo, '>>>>');

    return this.http.post<Todo>(this.baseUrl, todo).pipe(
      finalize(() => this._loading.set(false)),
      tap((newTodo) => {
        this._todos.update((todos) => [newTodo, ...todos]);
      }),
      catchError((err) => this.handleError('Failed to create todo', err)),
    );
  }

  private handleError(
    message: string,
    error: HttpErrorResponse,
  ): Observable<never> {
    const errorMessage = error.message || message;
    this._error.set(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
