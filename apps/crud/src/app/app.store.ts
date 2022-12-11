import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { pipe, switchMap, tap } from 'rxjs';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Injectable()
export class AppStore extends ComponentStore<{
  todos: Todo[];
  loading: boolean;
}> {
  readonly todos$ = this.select((state) => state.todos);
  readonly loading$ = this.select((state) => state.loading);

  readonly person$;

  readonly vm$ = this.select({
    todos: this.todos$,
    loading: this.loading$,
  });

  constructor(private todoService: TodoService) {
    super({ todos: [], loading: false });
  }

  private readonly updateTodos = this.updater((state, todo: Todo) => ({
    loading: false,
    todos: state.todos.map((t) => (t.id === todo.id ? { ...todo } : t)),
  }));

  readonly fetchTodo = this.effect<void>(
    pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.todoService.getAllTodo().pipe(
          tapResponse(
            (todos) => this.patchState({ todos, loading: false }),
            (_) => _
          )
        )
      )
    )
  );

  readonly updateTodo = this.effect<number>(
    pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((id) =>
        this.todoService.update(id).pipe(
          tapResponse(
            (todo) => this.updateTodos(todo),
            (_) => _
          )
        )
      )
    )
  );
}
