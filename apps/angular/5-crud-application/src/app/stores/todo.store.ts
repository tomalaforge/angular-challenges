import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

export interface TodoState {
  todos: Todo[];
  loadingIds: number[];
  error: string | null;
}

@Injectable()
export class TodoStore extends ComponentStore<TodoState> {
  constructor(private todoService: TodoService) {
    super({ todos: [], loadingIds: [], error: null });
  }

  readonly todos$ = this.select((state) => state.todos);
  readonly loadingIds$ = this.select((state) => state.loadingIds);
  readonly error$ = this.select((state) => state.error);

  readonly loadTodos = this.effect(() => {
    return this.todoService.getTodos().pipe(
      tap({
        next: (todos) => this.patchState({ todos }),
        error: () => this.patchState({ error: 'Failed to load todos' }),
      }),
    );
  });

  readonly updateTodo = this.effect<Todo>((todo$) =>
    todo$.pipe(
      tap((todo) =>
        this.patchState((state) => ({
          loadingIds: [...state.loadingIds, todo.id],
        })),
      ),
      switchMap((todo) =>
        this.todoService.updateTodo(todo).pipe(
          tap({
            next: (updatedTodo) => {
              this.patchState((state) => ({
                todos: state.todos.map((t) =>
                  t.id === updatedTodo.id ? updatedTodo : t,
                ),
                loadingIds: state.loadingIds.filter((id) => id !== todo.id),
              }));
            },
            error: () =>
              this.patchState((state) => ({
                error: 'Failed to update todo',
                loadingIds: state.loadingIds.filter((id) => id !== todo.id),
              })),
          }),
        ),
      ),
    ),
  );

  readonly deleteTodo = this.effect<Todo>((todo$) =>
    todo$.pipe(
      tap((todo) =>
        this.patchState((state) => ({
          loadingIds: [...state.loadingIds, todo.id],
        })),
      ),
      switchMap((todo) =>
        this.todoService.deleteTodo(todo).pipe(
          tap({
            next: () => {
              this.patchState((state) => ({
                todos: state.todos.filter((t) => t.id !== todo.id),
                loadingIds: state.loadingIds.filter((id) => id !== todo.id),
              }));
            },
            error: () =>
              this.patchState((state) => ({
                error: 'Failed to delete todo',
                loadingIds: state.loadingIds.filter((id) => id !== todo.id),
              })),
          }),
        ),
      ),
    ),
  );
}
