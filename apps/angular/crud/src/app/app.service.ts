import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { catchError, throwError } from 'rxjs';
import { Todo } from './app.component';

@Injectable({ providedIn: 'root' })
export class TodosService {
  http = inject(HttpClient);
  todos = signal([] as Todo[]);
  loading = signal(true);
  private url = 'https://jsonplaceholder.typicode.com/todos';
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.'),
    );
  }

  getTodos() {
    return this.http.get<Todo[]>(this.url).pipe(catchError(this.handleError));
  }

  updateTodo(todo: Todo) {
    return this.http
      .put<Todo>(
        `${this.url}/${todo.id}`,
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
      )
      .pipe(catchError(this.handleError));
  }

  deleteTodo(deletedTodo: Todo) {
    return this.http
      .delete<Todo>(`${this.url}/${deletedTodo.id}`)
      .pipe(catchError(this.handleError));
  }
}
