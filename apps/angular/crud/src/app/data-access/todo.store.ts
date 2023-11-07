import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { TodoState } from '../models/todo-state.model';
import { Todo } from '../models/todo.model';

const defaultState: TodoState = {
  todos: [],
};

@Injectable()
export class TodoStore extends ComponentStore<TodoState> {
  constructor() {
    super(defaultState);
  }

  readonly todos$ = this.select(({ todos }) => todos);

  readonly loadTodos = this.updater((state, todos: Todo[]) => ({
    ...state,
    todos: todos || [],
  }));
}
