import { createReducer, on } from '@ngrx/store';
import { TodoState } from '../todo.state';
import { TodoActions } from '../actions/todo.actions';

export const initialState: TodoState = { todoList: [] };

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodoList, (state, { todoList }) => {
    return { ...state, todoList: [...todoList] };
  }),
  on(TodoActions.deleteTodoSuccess, (state, { id }) => {
    return {
      ...state,
      todoList: [...state.todoList.filter((t) => t.id !== id)],
    };
  }),
  on(TodoActions.updateTodoSuccess, (state, { todo }) => {
    return {
      ...state,
      todoList: [...state.todoList.filter((t) => t.id !== todo.id), todo].sort(
        (t1, t2) => t1.id - t2.id,
      ),
    };
  }),
  on(TodoActions.todoError, (state, { id, errorMsg }) => {
    return {
      ...state,
      todoList: [
        ...state.todoList.map((t) =>
          t.id === id ? { ...t, errorMsg: errorMsg, loading: false } : t,
        ),
      ],
    };
  }),
  on(TodoActions.callUpdateTodo, (state, { todo }) => {
    return {
      ...state,
      todoList: [
        ...state.todoList.map((t) =>
          t.id === todo.id ? { ...t, loading: true, errorMsg: '' } : t,
        ),
      ],
    };
  }),
  on(TodoActions.callDeleteTodo, (state, { id }) => {
    return {
      ...state,
      todoList: [
        ...state.todoList.map((t) =>
          t.id === id ? { ...t, loading: true, errorMsg: '' } : t,
        ),
      ],
    };
  }),
);
