import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Todo } from '../interfaces/todo.interface';
import { TodosService } from '../services/todos.service';

type TodosState = {
  todos: Todo[];
  isLoading: boolean;
};

const initialState: TodosState = {
  todos: [],
  isLoading: false,
};

export const TodosStore = signalStore(
  withState(initialState),
  withMethods((store, todosService = inject(TodosService)) => ({
    async loadAll(): Promise<void> {
      patchState(store, { isLoading: true });
      todosService.getTodos().subscribe((todos) => {
        patchState(store, { todos, isLoading: false });
      });
    },
    async updateTodo(todo: Todo): Promise<void> {
      patchState(store, { isLoading: true });
      todosService.updateTodo(todo).subscribe((updatedTodo) => {
        patchState(store, (state) => ({
          todos: state.todos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo,
          ),
          isLoading: false,
        }));
      });
    },
    async deleteTodo(deletedTodo: Todo): Promise<void> {
      patchState(store, { isLoading: true });
      todosService.deleteTodo(deletedTodo).subscribe(() => {
        patchState(store, (state) => ({
          todos: state.todos.filter((todo) => todo.id !== deletedTodo.id),
          isLoading: false,
        }));
      });
    },
  })),
);
