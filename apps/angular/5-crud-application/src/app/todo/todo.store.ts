import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
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
    });
  }

  private service = inject(ServiceTodo);

  // selectors
  readonly todos$ = this.select((state) => state.todos);
  readonly isLoading$ = this.select((state) => state.isLoading);

  // updaters
  readonly setLoading = this.updater<boolean>((state, isLoading) => ({
    ...state,
    isLoading,
  }));

  readonly setTodos = this.updater<todo[]>((state, todos) => ({
    ...state,
    todos,
  }));

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
      tap(() => this.setLoading(true)),
      switchMap((todo) =>
        this.service.updateTodo(todo).pipe(
          tap((updated) => {
            this.setTodos(
              this.get().todos.map((t) => (t.id === updated.id ? updated : t)),
            );
            this.setLoading(false);
          }),
        ),
      ),
    ),
  );

  readonly deleteTodo = this.effect<todo>((todo$) =>
    todo$.pipe(
      tap(() => this.setLoading(true)),
      switchMap((todo) =>
        this.service.deleteTodo(todo).pipe(
          tap(() => {
            this.setTodos(this.get().todos.filter((t) => t.id !== todo.id));
            this.setLoading(false);
          }),
        ),
      ),
    ),
  );
}
