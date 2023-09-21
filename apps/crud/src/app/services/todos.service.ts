import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/interface.todo';
import {
  BehaviorSubject,
  Observable,
  catchError,
  retry,
  throwError,
} from 'rxjs';
import { randText } from '@ngneat/falso';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com';

  todoList$ = new BehaviorSubject<Todo[]>([]);

  constructor(private http: HttpClient) {}

  initTodos() {
    return this.http
      .get<Todo[]>(`${this.apiUrl}/todos`)
      .pipe(retry(3), catchError(this.handleError));
  }

  getTodos() {
    return this.todoList$.asObservable();
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      `${this.apiUrl}/todos/${todo.id}`,
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
      }
    );
  }

  deleteTodo(todo: Todo): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/todos/${todo.id}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(() => {
      new Error('Something bad happened; please try again later.');
    });
  }
}
