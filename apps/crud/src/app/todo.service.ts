/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { delay, Observable, switchMap, tap } from 'rxjs';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  body: string;
  meta: { loading: boolean; error: Error | null };
};

type TodoState = {
  todos?: Todo[];
  loading: boolean;
  error: Error | null;
};

@Injectable({ providedIn: 'root' })
export class TodoService extends ComponentStore<TodoState> {
  constructor(private httpClient: HttpClient) {
    super({
      todos: [],
      loading: false,
      error: null,
    });
  }

  readonly vm$ = this.select({
    todos: this.select((state) => state.todos),
    error: this.select((state) => state.error),
    loading: this.select((state) => state.loading),
  });

  readonly getTodos$ = this.effect((params$) => {
    return params$.pipe(
      tap(() => this.showLoading()),
      switchMap(() =>
        this.httpClient
          .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
          .pipe(delay(2000))
      ),
      tapResponse(
        (todos) => {
          this.patchState({
            todos: todos,
            loading: false,
            error: null,
          });
        },
        (error: Error) => {
          this.handleError(error);
        }
      )
    );
  });

  readonly updateTodo = (todo: Todo) =>
    this.httpClient
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
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
      )
      .pipe(delay(2000));

  readonly deleteTodo$ = this.effect((todo: Observable<Todo>) => {
    return todo.pipe(
      switchMap((todo) =>
        this.httpClient
          .delete<void>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
          .pipe(
            tapResponse(
              () => {
                this.patchState({
                  todos: [
                    ...(this.get()?.todos as Todo[]).filter(
                      (eachTodo) => eachTodo?.id !== todo?.id
                    ),
                  ],
                  loading: false,
                  error: null,
                });
              },
              (error: Error) => {
                this.handleError(error);
              }
            )
          )
      )
    );
  });

  private showLoading = this.updater(() => ({
    loading: true,
    error: null,
  }));

  private handleError = this.updater((state, error: Error) => ({
    error,
    loading: false,
  }));
}
