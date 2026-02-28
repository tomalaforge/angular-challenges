import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';
import { todo } from './todo.model';
import { ServiceTodo } from './todo.service';
import { TodoState } from './todo.state';

@Injectable({
  providedIn: 'root', // This makes the service a singleton available everywhere
})
export class TodoStore extends ComponentStore<TodoState> {
  constructor() {
    super({
      todos: [],
      isLoading: true,
      processingIds: new Set<number>(),
      errors: {},
    });
  }

  private service = inject(ServiceTodo);

  // selectors
  readonly todos$ = this.select((state) => state.todos);
  readonly isLoading$ = this.select((state) => state.isLoading);
  readonly processingIds$ = this.select((state) => state.processingIds);
  readonly isTodoProcessing$ = (id: number) =>
    this.select(this.processingIds$, (ids) => ids.has(id));
  readonly todoError$ = (id: number) =>
    this.select(
      this.select((state) => state.errors),
      (errors) => errors[id],
    );

  // updaters
  readonly setLoading = this.updater<boolean>((state, isLoading) => ({
    ...state,
    isLoading,
  }));

  readonly setTodos = this.updater<todo[]>((state, todos) => ({
    ...state,
    todos,
  }));

  readonly addProcessingId = this.updater<number>((state, id) => ({
    ...state,
    processingIds: new Set(state.processingIds).add(id),
  }));

  readonly removeProcessingId = this.updater<number>((state, id) => {
    const ids = new Set(state.processingIds);
    ids.delete(id);
    return { ...state, processingIds: ids };
  });

  readonly setTodoError = this.updater<{ id: number; error: string | null }>(
    (state, { id, error }) => ({
      ...state,
      errors: { ...state.errors, [id]: error },
    }),
  );

  // effects
  readonly loadTodos = this.effect<void>((trigger$) =>
    trigger$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(() =>
        this.service.getTodos().pipe(
          tap((todos) => {
            this.setTodos(todos);
            this.setLoading(false);
          }),
        ),
      ),
    ),
  );

  readonly updateTodo = this.effect<todo>((todo$) =>
    todo$.pipe(
      tap((todo) => {
        this.addProcessingId(todo.id);
        this.setTodoError({ id: todo.id, error: null });
      }),
      switchMap((todo) =>
        this.service.updateTodo(todo).pipe(
          tap((updated) => {
            this.setTodos(
              this.get().todos.map((t) => (t.id === updated.id ? updated : t)),
            );
            this.removeProcessingId(todo.id);
          }),
          catchError((err) => {
            this.setTodoError({ id: todo.id, error: 'Update failed' });
            this.removeProcessingId(todo.id);
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  readonly deleteTodo = this.effect<todo>((todo$) =>
    todo$.pipe(
      tap((todo) => {
        this.addProcessingId(todo.id);
        this.setTodoError({ id: todo.id, error: null });
      }),
      switchMap((todo) =>
        this.service.deleteTodo(todo).pipe(
          tap(() => {
            this.setTodos(this.get().todos.filter((t) => t.id !== todo.id));
            this.removeProcessingId(todo.id);
          }),
          catchError((err) => {
            this.setTodoError({ id: todo.id, error: 'Delete failed' });
            this.removeProcessingId(todo.id);
            return EMPTY;
          }),
        ),
      ),
    ),
  );
}
