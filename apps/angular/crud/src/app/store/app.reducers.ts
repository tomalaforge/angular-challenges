import { createReducer, on } from '@ngrx/store';
// import { Action } from '@ngrx/store';
// import { GETALLTODO, GetAllTodoActions, TodoActions } from './app.actions';
import { TODO } from '../app.service';
import {
  addedAllTodosAction,
  deleteTodoAction,
  errorAction,
  getAllTodosAction,
  successUpdateTodoAction,
  successdeleteTodoAction,
  updateTodoAction,
} from './app.actions';

export interface TodosState {
  todos: TODO[];
  isLoading: boolean;
  isError: string;
}

const initialState: TodosState = {
  todos: [],
  isLoading: false,
  isError: '',
};

export const todosReducer = createReducer(
  initialState,
  on(getAllTodosAction, (state, action) => {
    return { ...state, isLoading: action.loading };
  }),
  on(addedAllTodosAction, (state, action) => {
    return {
      ...state,
      todos: action.todos,
      isLoading: false,
    };
  }),
  on(errorAction, (state, action) => {
    return {
      ...state,
      isLoading: false,
      isError: action.error,
    };
  }),
  on(updateTodoAction, (state, action) => {
    return {
      ...state,
      isLoading: action.loading,
    };
  }),
  on(successUpdateTodoAction, (state, action) => {
    return {
      ...state,
      isLoading: action.loading,
      todos: state.todos.map((t) =>
        t.id === action.todo.id ? action.todo : t,
      ),
    };
  }),
  on(deleteTodoAction, (state, action) => {
    return {
      ...state,
      isLoading: action.loading,
    };
  }),
  on(successdeleteTodoAction, (state, action) => {
    return {
      ...state,
      isLoading: action.loading,
      todos: state.todos.filter((t) => t.id !== action.id),
    };
  }),
);

// old way to create a Reducer
// export function todosReducer(
//   state = initialState,
//   action: TodoActions | Action ,
// ) {
//   switch (action.type) {
//     case GETALLTODO:
//       return [...state, (action as GetAllTodoActions).payload];
//     default:
//       return state;
//   }
// }
