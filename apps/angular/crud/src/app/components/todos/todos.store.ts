import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Todo } from '../../shared/models/todo.interface';
import { ApiService } from '../../shared/services/api.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
export interface TodosState {
  todos: Todo[];
  loading: boolean;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
};

@Injectable({ providedIn: 'root' })
export class TodosStore extends ComponentStore<TodosState> {
  readonly #apiService = inject(ApiService);
  readonly #errorHandlerService = inject(ErrorHandlerService);

  constructor() {
    super(initialState);
  }

  init() {
    this.load();
  }

  setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  setTodos = this.updater((state, todos: Todo[]) => ({ ...state, todos }));

  load = this.effect<void>((trigger$) =>
    trigger$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(() =>
        this.#apiService.getTodos().pipe(
          tap((todos) => this.setTodos(todos)),
          tap(() => this.setLoading(false)),
          catchError((error) => {
            this.#errorHandlerService.handleError(error);
            return [];
          }),
        ),
      ),
    ),
  );

  update = this.effect<Todo>((todo$) =>
    todo$.pipe(
      tap(() => this.setLoading(true)),
      switchMap((todo) =>
        this.#apiService.update(todo).pipe(
          concatLatestFrom(() => this.select((state) => state.todos)),
          tap(([todo, todos]) => {
            this.setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
            this.setLoading(false);
          }),
          catchError((error) => {
            this.#errorHandlerService.handleError(error);
            return [];
          }),
        ),
      ),
    ),
  );

  delete = this.effect<Todo>((todo$) =>
    todo$.pipe(
      tap(() => this.setLoading(true)),
      switchMap((todo) =>
        this.#apiService.delete(todo).pipe(
          concatLatestFrom(() => this.select((state) => state.todos)),
          tap(([, todos]) => {
            this.setTodos(todos.filter((t) => t.id !== todo.id));
            this.setLoading(false);
          }),
          catchError((error) => {
            this.#errorHandlerService.handleError(error);
            return [];
          }),
        ),
      ),
    ),
  );
}
