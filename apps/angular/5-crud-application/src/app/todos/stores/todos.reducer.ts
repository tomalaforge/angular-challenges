import { createReducer, on } from '@ngrx/store';
import { ITodo } from '../interfaces/todo.interface';
import * as TodosActions from './todos.actions';

export interface IState {
  isGlobalLoaderVisible: boolean;
  todos: ITodo[];
  hasErroredGlobal: boolean;
  hasErroredLocal: {
    todoId: number;
    status: boolean;
  };
  hasErroredLocalMessage: string | null;
}

export const initialState: IState = {
  isGlobalLoaderVisible: true,
  todos: [],
  hasErroredGlobal: false,
  hasErroredLocal: {
    todoId: 0,
    status: false,
  },
  hasErroredLocalMessage: null,
};

export const todosReducer = createReducer(
  initialState,
  on(TodosActions.showGlobalLoader, (state) => ({
    ...state,
    isGlobalLoaderVisible: true,
  })),
  on(TodosActions.hideGlobalLoader, (state) => ({
    ...state,
    isGlobalLoaderVisible: false,
  })),
  on(TodosActions.fetchTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    isGlobalLoaderVisible: false,
  })),
  on(TodosActions.fetchTodosError, (state) => ({ ...state, hasErrored: true })),
  on(TodosActions.updateTodo, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((todoEl) =>
      todoEl.id === todo.id ? { ...todoEl, isLoading: true } : todoEl,
    ),
  })),
  on(TodosActions.updateTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((todoEl) => (todoEl.id === todo.id ? todo : todoEl)),
  })),
  on(TodosActions.updateTodoError, (state, { message, id }) => ({
    ...state,
    hasErroredLocal: {
      status: true,
      todoId: id,
    },
    hasErroredLocalMessage: message,
    todos: state.todos.map((todoEl) =>
      todoEl.id === id ? { ...todoEl, isLoading: false } : todoEl,
    ),
  })),
  on(TodosActions.deleteTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id != id),
  })),
);
