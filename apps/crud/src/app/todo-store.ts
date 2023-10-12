import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { ComponentStore, OnStateInit } from '@ngrx/component-store';

interface TodoState {
  todos: Todo[];
  loadingAllTodos: boolean;
  loadingSingleTodo: boolean;
}

const initialTodoState: TodoState = {
  todos: [],
  loadingAllTodos: false,
  loadingSingleTodo: false,
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

  getTodos = this.updater((state, todos: Todo[]) => ({
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

  ngrxOnStateInit() {
    // this.fetchTodo();
  }
}
