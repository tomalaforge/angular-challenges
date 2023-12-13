import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { randText } from '@ngneat/falso';
import { concatLatestFrom } from '@ngrx/effects';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { Todo } from './todo.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  #http = inject(HttpClient);
  #errorHandlerService = inject(ErrorHandlerService);
  #todos = new BehaviorSubject<Todo[]>([]);
  readonly todos$ = this.#todos.asObservable();

  getTodos(): void {
    this.#http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        catchError((error) => {
          this.#errorHandlerService.handleError(error);
          return of([]);
        }),
      )
      .subscribe((todos) => this.#todos.next(todos));
  }

  update({ id, body, userId }: Todo) {
    this.#http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        JSON.stringify({ id, body, userId, title: randText() }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .pipe(concatLatestFrom(() => this.todos$))
      .subscribe(([todo, todos]) => {
        this.#todos.next(todos.map((t) => (t.id === todo.id ? todo : t)));
      });
  }

  delete({ id }: Todo) {
    this.#http
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .pipe(concatLatestFrom(() => this.todos$))
      .subscribe(([, todos]) => {
        this.#todos.next(todos.filter((t) => t.id !== id));
      });
  }
}
