import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { switchMap, tap } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { Todo, ViewModel } from '../../types';

@Injectable()
export class TodoListStore
  extends ComponentStore<ViewModel<Todo[]>>
  implements OnStoreInit
{
  private readonly todoService = inject(TodoService);

  constructor() {
    super({
      data: [],
      status: 'idle',
    });
  }

  // Fetch todo list immediately after component store initially instantiated
  ngrxOnStoreInit() {
    this.fetchTodoList();
  }

  /** ----------- SELECTOR SECTION ----------- */
  private readonly todos$ = this.select((state) => state.data);
  private readonly status$ = this.select((state) => state.status);
  readonly vm$ = this.select(
    {
      data: this.todos$,
      status: this.status$,
    },
    { debounce: true },
  );

  /** ----------- UPDATER SECTION ----------- */
  readonly fetchingTodoList = this.updater((state) => ({
    ...state,
    status: 'loading',
  }));

  readonly getTodoListSuccess = this.updater((state, todo: Todo[]) => ({
    ...state,
    data: todo,
    status: 'success',
  }));

  readonly getTodoListFailed = this.updater((state) => ({
    ...state,
    data: [],
    status: 'error',
  }));

  readonly updateTodo = this.updater((state, todo: Todo) => ({
    ...state,
    data: state.data.map((t) => (t?.id === todo.id ? { ...todo } : t)),
  }));

  readonly deleteTodo = this.updater((state, todoId: number) => ({
    ...state,
    data: state.data.filter((t) => t?.id !== todoId),
  }));

  /** ----------- EFFECT SECTION ----------- */
  readonly fetchTodoList = this.effect<void>((trigger$) =>
    trigger$.pipe(
      tap(() => this.fetchingTodoList()),
      switchMap(() =>
        this.todoService.getTodoList().pipe(
          tapResponse({
            next: (todos) => this.getTodoListSuccess(todos),
            error: (error: HttpErrorResponse) => this.getTodoListFailed(),
          }),
        ),
      ),
    ),
  );
}
