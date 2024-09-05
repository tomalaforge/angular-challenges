import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Todo } from '../Model/todo';
import { TodoService } from '../Service/todo.service';

type TodosState = {
  todos: Todo[];
};

const initialState: TodosState = {
  todos: [],
};

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, todoService = inject(TodoService)) => ({
    getTodos() {
      todoService.getTodos().subscribe((todos) => {
        patchState(store, { todos });
      });
    },
    updateTodo(todo: Todo) {
      todoService.updateTodo(todo).subscribe((todoUpdated) => {
        patchState(store, ({ todos }) => ({
          todos: todos.map((t) => (t.id === todoUpdated.id ? todoUpdated : t)),
        }));
      });
    },
    deleteTodo(todo: Todo) {
      todoService.deleteTodo(todo).subscribe(() => {
        patchState(store, ({ todos }) => ({
          todos: todos.filter((t) => t.id !== todo.id),
        }));
      });
    },
  })),
);
