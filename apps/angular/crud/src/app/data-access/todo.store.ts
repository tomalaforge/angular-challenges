import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ITodoState } from '../models/todo-state.model';
import { ITodo } from '../models/todo.model';

const defaultState: ITodoState = {
  todos: [],
};

@Injectable()
export class TodoStore extends ComponentStore<ITodoState> {
  constructor() {
    super(defaultState);
  }

  readonly todos$ = this.select(({ todos }) => todos);

  readonly loadTodos = this.updater((state, todos: ITodo[]) => ({
    ...state,
    todos: todos || [],
  }));
}
