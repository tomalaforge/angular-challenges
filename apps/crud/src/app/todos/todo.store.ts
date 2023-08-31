import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { pipe, switchMap, tap } from 'rxjs';
import { TodoService } from './todos.service';
import { Todo } from './todo.model';
interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: HttpErrorResponse | null;
}

const initState: TodoState = { todos: [], loading: false, error: null };

@Injectable()
export class TodoStore
  extends ComponentStore<TodoState>
  implements OnStateInit, OnStoreInit
{
  private readonly todoService = inject(TodoService);
  #todos$ = this.select((s) => s.todos);
  #loading$ = this.select((s) => s.loading);
  #error$ = this.select((s) => s.error);
  readonly vm$ = this.select(
    {
      todos: this.#todos$,
      loading: this.#loading$,
      error: this.#error$,
    },
    { debounce: true }
  );

  // private methods
  #startLoading = this.updater((state) => ({
    ...state,
    loading: true,
  }));
  #setError = this.updater((state, error: HttpErrorResponse) => ({
    ...state,
    error,
    loading: false,
  }));

  #addTodos = this.updater((state, todos: Todo[]) => ({
    ...state,
    todos,
    loading: false,
  }));

  #updateTodo = this.updater((state, todo: Todo) => ({
    ...state,
    loading: false,
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
  }));

  #deleteTodo = this.updater((state, id: number) => ({
    ...state,
    loading: false,
    todos: state.todos.filter((t) => t.id !== id),
  }));

  // public methods
  readonly loadTodos = this.effect<void>(
    pipe(
      tap((_) => this.#startLoading()),
      switchMap((_) =>
        this.todoService.getTodos().pipe(
          tapResponse(
            (todos) => this.#addTodos(todos),
            (error: HttpErrorResponse) => this.#setError(error)
          )
        )
      )
    )
  );

  readonly deleteTodo = this.effect<number>(
    pipe(
      tap((_) => this.#startLoading()),
      switchMap((id) =>
        this.todoService.deleteTodo(id).pipe(
          tapResponse(
            (_) => this.#deleteTodo(id),
            (error: HttpErrorResponse) => this.#setError(error)
          )
        )
      )
    )
  );

  readonly updateToDo = this.effect<Todo>(
    pipe(
      tap((_) => this.#startLoading()),
      switchMap((todo) =>
        this.todoService.updateTodo(todo).pipe(
          tapResponse(
            (_) => this.#updateTodo(todo),
            (error: HttpErrorResponse) => this.#setError(error)
          )
        )
      )
    )
  );

  ngrxOnStoreInit() {
    this.setState({ ...initState });
  }

  ngrxOnStateInit() {
    this.loadTodos();
  }
}
