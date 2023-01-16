/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { catchError, delay, switchMap, tap, throwError } from 'rxjs';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  body: string;
};

export type LoadingState = 'INIT' | 'LOADING' | 'LOADED';
export interface ErrorState {
  error: Error | null;
}

export type CallState = LoadingState | ErrorState;

export type TodoState = {
  todos: Todo[];
  callState: CallState;
};

@Injectable({ providedIn: 'root' })
export class TodoService extends ComponentStore<TodoState> {
  constructor(private httpClient: HttpClient) {
    super({
      todos: [],
      callState: 'INIT',
    });
  }

  readonly vm$ = this.select({
    todos: this.select((state) => state.todos),
    callState: this.select((state) => state.callState),
    error: this.select(({ callState }) => {
      if ((callState as ErrorState).error !== undefined) {
        return (callState as ErrorState).error;
      }
      return null;
    }),
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
            callState: 'LOADED',
          });
        },
        (error: Error) => {
          this.handleError(error);
        }
      )
    );
  });

  readonly updateTodo$ = (todo: Todo) =>
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
      .pipe(
        delay(2000),
        tap((todo) => {
          this.updateTodo(todo);
        }),
        catchError((err) => throwError(err))
      );

  readonly deleteTodo$ = (todo: Todo) => {
    return this.httpClient
      .delete<void>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
      .pipe(
        tap(() => {
          this.patchState({
            todos: [
              ...(this.get()?.todos as Todo[]).filter(
                (eachTodo) => eachTodo?.id !== todo?.id
              ),
            ],
            callState: 'LOADED',
          });
        }),
        catchError((err) => throwError(err))
      );
  };

  private updateTodo = this.updater((state, todo: Todo) => {
    return {
      ...state,
      todos: state.todos?.map((eachTodo) => {
        return eachTodo?.id === todo?.id ? todo : eachTodo;
      }),
      callState: 'LOADED',
    };
  });

  private showLoading = () => {
    this.patchState({ callState: 'LOADING' });
  };

  private handleError = (error: Error) => {
    this.patchState({
      callState: { error },
    });
  };
}
