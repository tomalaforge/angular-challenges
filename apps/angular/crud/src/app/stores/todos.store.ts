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
      todosService.getTodos().subscribe((todosResult) => {
        const todos = todosResult.map((todo) => {
          return { ...todo, updating: false };
        });
        patchState(store, { todos, isLoading: false });
      });
    },
    async updateTodo(todoToUpdate: Todo): Promise<void> {
      patchState(store, (state) => ({
        todos: state.todos.map((todo) =>
          todo.id === todoToUpdate.id
            ? { ...todoToUpdate, updating: true }
            : todo,
        ),
        isLoading: true,
      }));
      todosService.updateTodo(todoToUpdate).subscribe((updatedTodo) => {
        patchState(store, (state) => ({
          todos: state.todos.map((todo) =>
            todo.id === updatedTodo.id
              ? { ...updatedTodo, updating: false }
              : todo,
          ),
          isLoading: false,
        }));
      });
    },
    async deleteTodo(deletedTodo: Todo): Promise<void> {
      patchState(store, (state) => ({
        todos: state.todos.map((todo) =>
          todo.id === deletedTodo.id
            ? { ...deletedTodo, updating: true }
            : todo,
        ),
        isLoading: true,
      }));
      todosService.deleteTodo(deletedTodo).subscribe(() => {
        patchState(store, (state) => ({
          todos: state.todos.filter((todo) => todo.id !== deletedTodo.id),
          isLoading: false,
        }));
      });
    },
  })),
);
