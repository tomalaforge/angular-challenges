import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, exhaustMap, mergeMap, of, tap } from 'rxjs';
import { CallState } from '../model/loading.type';
import { Todo } from '../model/todo.interface';

export interface TodosState {
  todos: Todo[];
  callstate: CallState;
}

@Injectable()
export class TodosStore extends ComponentStore<TodosState> {
  constructor(private http: HttpClient) {
    super({
      todos: [],
      callstate: 'Loading',
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
      todos: updatedTodos,
    };
  });
  addToErrorList = this.updater((state, todoId: number) => ({
    ...state,
  }));
  deleteItemFromList = this.updater((state, todoId: number) => {
    console.log(todoId);

    return {
      ...state,
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

  delete = this.effect((todoId$: Observable<number>) => {
    return todoId$.pipe(
      mergeMap((todoId) => {
        return of(this.deleteItemFromList(todoId));
      })
    );
  });
}
