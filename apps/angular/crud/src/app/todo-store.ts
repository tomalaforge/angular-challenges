import { Injectable, inject } from '@angular/core';
import { Todo } from './todo.model';
import {
  ComponentStore,
  OnStateInit,
  tapResponse,
} from '@ngrx/component-store';
import { finalize, pipe, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TodoService } from './todo.service';

interface TodoState {
  todos: Todo[];
  loadingAllTodos: boolean;
  error: string;
}

const initialTodoState: TodoState = {
  todos: [],
  loadingAllTodos: false,
  error: '',
};

@Injectable({
  providedIn: 'root',
})
export class TodoStore
  extends ComponentStore<TodoState>
  implements OnStateInit
{
  constructor() {
    super(initialTodoState);
  }

  todos$ = this.select((s) => s.todos);
  loadingAllTodos$ = this.select((s) => s.loadingAllTodos);
  error$ = this.select((s) => s.error);

  readonly vm$ = this.select(
    {
      todos: this.todos$,
      loadingAllTodos: this.loadingAllTodos$,
      error: this.error$,
    },
    { debounce: true }
  );

  private todoService = inject(TodoService);

  addTodos = this.updater((state, todos: Todo[]) => ({
    ...state,
    todos,
  }));

  updateTodos = this.updater((state, todo: Todo) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
  }));

  deleteTodos = this.updater((state, id: number) => ({
    ...state,
    todos: state.todos.filter((t) => t.id !== id),
  }));

  setLoadingAllTodos = this.updater((state, value: boolean) => ({
    ...state,
    loadingAllTodos: value,
  }));

  setErrorState = this.updater((state, error: string) => ({
    ...state,
    error,
  }));

  fetchTodos = this.effect<void>(
    pipe(
      tap(() => this.setLoadingAllTodos(true)),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          finalize(() => {
            this.setLoadingAllTodos(false);
          }),

          tapResponse(
            (todos) => this.addTodos(todos),
            (error: HttpErrorResponse) => {
              this.setErrorState(error.message);
            }
          )
        )
      )
    )
  );

  ngrxOnStateInit() {
    this.fetchTodos();
  }
}
