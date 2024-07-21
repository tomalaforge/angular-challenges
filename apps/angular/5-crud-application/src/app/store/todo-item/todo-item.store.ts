import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { switchMap, tap } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../types';
import { TodoListStore } from '../todo-list/todo-list.store';
import { ViewModel } from './../../types/vm.type';

@Injectable()
export class TodoItemStore extends ComponentStore<ViewModel<Todo>> {
  private readonly todo$ = this.select((state) => state.data);
  private readonly status$ = this.select((state) => state.status);
  private readonly todoListStore = inject(TodoListStore);
  private readonly todoService = inject(TodoService);

  constructor() {
    super({
      data: {},
      status: 'idle',
    });
  }

  readonly vm$ = this.select(
    {
      todo: this.todo$,
      status: this.status$,
    },
    { debounce: true },
  );

  readonly startLoading = this.updater((state) => ({
    ...state,
    status: 'loading',
  }));

  readonly stopLoading = this.updater((state) => ({
    ...state,
    status: 'success',
  }));

  readonly handleError = this.updater((state) => ({
    ...state,
    data: {},
    status: 'error',
  }));

  readonly updateTodo = this.effect<number>((trigger$) =>
    trigger$.pipe(
      tap(() => this.startLoading()),
      switchMap((id) =>
        this.todoService.updateTodo(id).pipe(
          tapResponse({
            next: (todo) => {
              this.todoListStore.updateTodo(todo);
              this.stopLoading();
            },
            error: () => this.handleError(),
          }),
        ),
      ),
    ),
  );

  readonly deleteTodo = this.effect<number>((trigger$) =>
    trigger$.pipe(
      tap(() => this.startLoading()),
      switchMap((id) =>
        this.todoService.deleteTodo(id).pipe(
          tapResponse({
            next: () => {
              this.todoListStore.deleteTodo(id);
              this.stopLoading();
            },
            error: () => this.handleError(),
          }),
        ),
      ),
    ),
  );
}
