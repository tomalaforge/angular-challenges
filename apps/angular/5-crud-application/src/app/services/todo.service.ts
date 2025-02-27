import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Todo, TodoUpdate } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  todos = signal<Todo[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    this.loading.set(true);
    return this.http.get<Todo[]>(this.apiUrl).pipe(
      map((todos) => {
        this.todos.set(todos);
        this.loading.set(false);
        return todos;
      }),
      catchError((error) => {
        this.error.set('Failed to load todos');
        this.loading.set(false);
        return throwError(() => error);
      }),
    );
  }

  updateTodo(id: number, update: TodoUpdate): Observable<Todo> {
    return this.http
      .put<Todo>(`${this.apiUrl}/${id}`, update, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .pipe(
        map((updatedTodo) => {
          this.todos.update((todos) =>
            todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
          );
          return updatedTodo;
        }),
        catchError((error) => {
          this.error.set(`Failed to update todo #${id}`);
          return throwError(() => error);
        }),
      );
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      map(() => {
        this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
      }),
      catchError((error) => {
        this.error.set(`Failed to delete todo #${id}`);
        return throwError(() => error);
      }),
    );
  }
}
