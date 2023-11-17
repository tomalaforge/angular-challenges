import { Injectable } from '@angular/core';
import { Todo } from '../model/todo.interface';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { randText } from '@ngneat/falso';

@Injectable()
export class TodoItemService {
  private loading$$ = new BehaviorSubject(false);
  loading$ = this.loading$$.asObservable();

  constructor(private http: HttpClient) {}

  update(todo: Todo): Observable<Todo> {
    this.loading$$.next(true);
    return this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )
      .pipe(finalize(() => this.loading$$.next(false)));
  }

  delete(todoId: number): Observable<unknown> {
    this.loading$$.next(true);
    return this.http
      .delete<Todo>(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      .pipe(finalize(() => this.loading$$.next(false)));
  }
}
