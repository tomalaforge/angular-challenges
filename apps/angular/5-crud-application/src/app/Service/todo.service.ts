import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable, catchError } from 'rxjs';
import { Todo } from '../Model/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw 'GET request failed. Details: ' + error.message;
        }),
      );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          completed: todo.completed,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw 'PUT request failed. Details: ' + error.message;
        }),
      );
  }

  deleteTodo(todo: Todo): Observable<void> {
    return this.http
      .delete<void>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw 'DELETE request failed. Details: ' + error.message;
        }),
      );
  }
}
