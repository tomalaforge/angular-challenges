import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, exhaustMap, mergeMap, tap } from 'rxjs';
import { CallState } from '../model/loading.type';
import { Todo } from '../model/todo.interface';

export interface TodosState {
  todos: Todo[];
  callstate: CallState;
  disabledTodosIds: number[];
  errorTodosIds: number[];
}

@Injectable()
export class TodosStore extends ComponentStore<TodosState> {
  constructor(private http: HttpClient) {
    super({
      todos: [],
      callstate: 'Loading',
      disabledTodosIds: [],
      errorTodosIds: [],
    });
  }

  setIsLoading = this.updater((state) => ({ ...state, callstate: 'Loading' }));
  addTodos = this.updater((state, todos: Todo[]) => ({
    ...state,
    callstate: 'Loaded',
    todos,
  }));
  setError = this.updater((state, error: HttpErrorResponse) => ({
    ...state,
    callstate: { err: error.message },
  }));
  addToLoadingList = this.updater((state, todoId: number) => ({
    ...state,
    disabledTodosIds: [...state.disabledTodosIds, todoId],
  }));
  setUpdatedTodo = this.updater((state, updatedItem: Todo) => {
    const updatedTodoIndex = state.todos.findIndex(
      (t) => t.id === updatedItem.id
    );
    const updatedTodos = [...state.todos];
    if (updatedTodoIndex > -1) {
      updatedTodos[updatedTodoIndex] = updatedItem;
    }
    return {
      ...state,
      disabledTodosIds: state.disabledTodosIds.filter(
        (t) => t !== updatedItem.id
      ),
      todos: updatedTodos,
    };
  });
  addToErrorList = this.updater((state, todoId: number) => ({
    ...state,
    disabledTodosIds: state.disabledTodosIds.filter((t) => t !== todoId),
    errorTodosIds: [...state.errorTodosIds, todoId],
  }));
  deleteItemFromList = this.updater((state, todoId: number) => {
    console.log(todoId);

    return {
      ...state,
      disabledTodosIds: state.disabledTodosIds.filter((t) => t !== todoId),
      todos: state.todos.filter((t) => t.id !== todoId),
    };
  });

  load = this.effect((trigger$) => {
    return trigger$.pipe(
      tap(() => {
        this.setIsLoading();
      }),
      exhaustMap(() => {
        return this.http
          .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
          .pipe(
            tapResponse(
              (todos) => {
                this.addTodos(todos);
              },
              (error: HttpErrorResponse) => {
                this.setError(error);
              }
            )
          );
      })
    );
  });

  update = this.effect((todo$: Observable<Todo>) => {
    return todo$.pipe(
      tap((todo) => {
        this.addToLoadingList(todo.id);
      }),
      mergeMap((todo) => {
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
          .pipe(
            tapResponse(
              (updatedTodo) => this.setUpdatedTodo(updatedTodo),
              (err: HttpErrorResponse) => {
                this.addToErrorList(todo.id);
              }
            )
          );
      })
    );
  });

  delete = this.effect((todoId$: Observable<number>) => {
    return todoId$.pipe(
      tap((todoId) => {
        this.addToLoadingList(todoId);
      }),
      mergeMap((todoId) => {
        return this.http
          .delete<Todo>(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
          .pipe(
            tapResponse(
              () => this.deleteItemFromList(todoId),
              (err: HttpErrorResponse) => {
                this.addToErrorList(todoId);
              }
            )
          );
      })
    );
  });
}
