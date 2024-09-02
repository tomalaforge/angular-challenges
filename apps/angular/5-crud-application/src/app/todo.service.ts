import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ITodo } from './todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<ITodo[]> {
    return this.http
      .get<ITodo[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  updateTodo(todo: ITodo): Observable<ITodo> {
    return this.http
      .put<ITodo>(
        `${this.apiUrl}/${todo.id}`,
        JSON.stringify({
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .pipe(catchError(this.handleError));
  }

  deleteTodo(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(
      () =>
        new Error(
          error?.message || 'Something went wrong, please try again later.',
        ),
    );
  }
}
