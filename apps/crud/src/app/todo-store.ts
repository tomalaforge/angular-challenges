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
  loadingSingleTodo: boolean;
  error: string;
}

const initialTodoState: TodoState = {
  todos: [],
  loadingAllTodos: false,
  loadingSingleTodo: false,
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

  private todoService = inject(TodoService);

  addTodos = this.updater((state, todos: Todo[]) => ({
    ...state,
    todos,
  }));

  updateTodos = this.updater((state, todo: Todo) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
  }));

  deleteTodos = this.updater((state, todo: Todo) => ({
    ...state,
    todos: state.todos.filter((t) => t.id !== todo.id),
  }));

  setLoadingAllTodos = this.updater((state, value: boolean) => ({
    ...state,
    loadingAllTodos: value,
  }));

  setLoadingSingleTodo = this.updater((state, value: boolean) => ({
    ...state,
    loadingSingleTodo: value,
  }));

  setErrorState = this.updater((state, error: string) => ({
    ...state,
    error,
  }));

  readonly fetchTodos = this.effect<void>(
    pipe(
      tap(() => this.setLoadingAllTodos(true)),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          tapResponse(
            (todos) => this.addTodos(todos),
            (error: HttpErrorResponse) => this.setErrorState(error.message)
          )
        )
      ),
      finalize(() => this.setLoadingAllTodos(false))
    )
  );

  ngrxOnStateInit() {
    this.fetchTodos();
  }
}
