import { Injectable, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { ToDoItem, ToDoState } from './model/to-do.model';
import { Observable, exhaustMap, tap } from 'rxjs';
import { HttpService } from '../http/http.service';
import { HttpErrorResponse } from '@angular/common/http';

const initialState: ToDoState = {
  todo: [],
  isLoading: false,
  error: null,
};

@Injectable()
export class ToDoStore extends ComponentStore<ToDoState> {
  private readonly http = inject(HttpService);
  readonly todo = this.selectSignal((s) => s.todo);
  readonly error = this.selectSignal((s) => s.error);
  readonly isLoading = this.selectSignal((s) => s.isLoading);

  constructor() {
    super(initialState);
  }

  private readonly storeTodo = this.updater(
    (s: ToDoState, todo: ToDoItem[]): ToDoState => ({
      ...s,
      todo: todo,
    })
  );

  private readonly mutateTodo = this.updater(
    (s: ToDoState, todoItem: ToDoItem): ToDoState => ({
      ...s,
      todo: s.todo.map((todo) => {
        if (todo.id === todoItem.id) {
          return todoItem;
        }
        return todo;
      }),
    })
  );

  private readonly removeTodo = this.updater(
    (s: ToDoState, id: number): ToDoState => ({
      ...s,
      todo: s.todo.filter((item) => item.id !== id),
    })
  );

  readonly setTodo = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      exhaustMap(() =>
        this.http.fetch().pipe(
          tapResponse({
            next: (todo: ToDoItem[]) => this.storeTodo(todo),
            error: (error: HttpErrorResponse) =>
              this.patchState({ error: error }),
            finalize: () => this.patchState({ isLoading: false }),
          })
        )
      )
    )
  );

  readonly updateTodo = this.effect((trigger$: Observable<ToDoItem>) =>
    trigger$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      exhaustMap((todo: ToDoItem) =>
        this.http.update(todo).pipe(
          tapResponse({
            next: (todo: ToDoItem) => this.mutateTodo(todo),
            error: (error: HttpErrorResponse) =>
              this.patchState({ error: error }),
            finalize: () => this.patchState({ isLoading: false }),
          })
        )
      )
    )
  );

  readonly deleteTodo = this.effect((trigger$: Observable<number>) =>
    trigger$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      exhaustMap((id: number) =>
        this.http.delete(id).pipe(
          tapResponse({
            next: () => this.removeTodo(id),
            error: (error: HttpErrorResponse) =>
              this.patchState({ error: error }),
            finalize: () => this.patchState({ isLoading: false }),
          })
        )
      )
    )
  );
}
