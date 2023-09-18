import { Injectable } from '@angular/core';
import { Todo } from '../models/interface.todo';
import { ComponentStore } from '@ngrx/component-store';

export interface todosState {
  todos: Todo[];
  processingItemId: number | null;
}

const defaultState: todosState = {
  todos: [],
  processingItemId: null,
};

@Injectable()
export class TodosStore extends ComponentStore<todosState> {
  constructor() {
    super(defaultState);
  }

  readonly todos$ = this.select(({ todos }) => todos);
  readonly processingItemId$ = this.select(
    ({ processingItemId }) => processingItemId
  );

  readonly loadTodos = this.updater((state, todos: Todo[] | null) => ({
    ...state,
    todos: todos || [],
  }));

  readonly startProcessing = this.updater((state, itemId: number) => ({
    ...state,
    processingItemId: itemId,
  }));

  readonly stopProcessing = this.updater((state) => ({
    ...state,
    processingItemId: null,
  }));

  readonly updateTodoInList = this.updater((state, updatedTodo: Todo) => {
    const updatedTodos = state.todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    return { ...state, todos: updatedTodos };
  });

  readonly removeTodoFromList = this.updater((state, todoId: number) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== todoId),
  }));
}
