import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { Observable, exhaustMap } from 'rxjs';

import { Todo } from './interfaces/Todo';
import { TodoService } from './service/todo.service';

export interface AppState {
  todos: Todo[];
  callState: string;
}

// maybe better to add {providedIn: root} to Injectable
// is it really necessary to create another store just for a presentational component?
// pass update / delete methods to TodoItemComponent?
@Injectable()
export class AppStore
  extends ComponentStore<AppState>
  implements OnStateInit, OnStoreInit
{
  // making todo$ and callState$ -> private -> makes testing more difficult ?
  readonly todos$: Observable<Todo[]> = this.select((state) => state.todos);
  readonly callState$: Observable<string> = this.select(
    (state) => state.callState
  );

  todoService = inject(TodoService);

  ngrxOnStoreInit() {
    this.setState({ todos: [], callState: 'Loading' });
  }

  ngrxOnStateInit() {
    this.fetchTodo();
  }

  readonly vm$ = this.select(
    {
      todos: this.todos$,
      callState: this.callState$,
    },
    { debounce: true }
  );

  // this is outdated ngrx syntax - don't need to use a trigger$ anymore
  readonly fetchTodo = this.effect<void>((trigger$) =>
    trigger$.pipe(
      exhaustMap(() =>
        this.todoService.getTodos().pipe(
          tapResponse(
            (todos: any) => this.patchState({ todos, callState: 'LOADED' }),
            (error: HttpErrorResponse) =>
              this.patchState({ callState: error.message })
          )
        )
      )
    )
  );

  readonly updateTodo = this.updater((state, todo: Todo) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? { ...todo } : t)),
  }));

  readonly deleteTodoState = this.updater((state, todoId: number) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== todoId),
  }));
}
