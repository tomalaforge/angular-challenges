import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { TODO } from './models/todo.model';
import { TodoService } from './services/todo.service';
import { todoStore } from './todo.store';

type TodoItemState = {
  todos: Map<number, TODO>;
};

const initialState: TodoItemState = {
  todos: new Map(),
};

export const todoItemStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((state) => {
    const todoService = inject(TodoService);
    const todosStore = inject(todoStore);

    return {
      getTodos: function (): void {
        const todosMap = new Map();
        const todos = todosStore.todos();
        todos.forEach((td) => {
          todosMap.set(td.id, td);
        });
        patchState(state, { todos: todosMap });
      },
      updateTodo: function (td: TODO): void {
        const todos = state.todos();
        if (todos.get(td.id)) {
          (todos.get(td.id) as TODO).isUpdating = true;
        }
        patchState(state, { todos: todos });
        todoService.updateTodo(td).subscribe({
          next: (updatedTodo) => {
            todosStore.updateTodo(updatedTodo);
            this.resetItemUpdate();
          },
          error: () => {
            patchState(state, { todos: todos });
          },
        });
      },
      updateComplete: function (completed: boolean, td: TODO): void {
        const todos = state.todos();
        if (todos.get(td.id)) {
          (todos.get(td.id) as TODO).completed = completed;
          td.completed = completed;
        }
        patchState(state, { todos: todos });
        todosStore.updateTodo(td);
      },
      deleteTodo: function (todo: TODO): void {
        const todos = state.todos();
        if (todos && todos.size > 0 && todos.get(todo.id)) {
          (todos.get(todo.id) as TODO).isUpdating = true;
        }
        patchState(state, { todos: todos });
        todoService.deleteTodo(todo.id).subscribe({
          next: () => {
            todosStore.deleteTodo(todo.id);
            this.resetItemUpdate();
          },
          error: () => {
            this.resetItemUpdate();
          },
        });
      },
      resetItemUpdate(): void {
        const todos = state.todos();
        todos.forEach((todo) => {
          todo.isUpdating = false;
        });
        patchState(state, { todos: todos });
      },
    };
  }),
);
