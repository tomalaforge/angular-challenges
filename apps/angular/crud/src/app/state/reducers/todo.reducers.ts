import { createReducer, on } from '@ngrx/store';
import { TodoState } from '../todo.state';
import {
  loadTodoList,
  updateTodoSuccess,
  deleteTodoSuccess,
  todoStatus,
} from '../actions/todo.actions';

export const initialState: TodoState = { todoList: [] };

export const todoReducer = createReducer(
  initialState,
  on(loadTodoList, (state, { todoList }) => {
    return { ...state, todoList: [...todoList] };
  }),
  on(deleteTodoSuccess, (state, { id }) => {
    return {
      ...state,
      todoList: [...state.todoList.filter((t) => t.id !== id)],
    };
  }),
  on(updateTodoSuccess, (state, { todo }) => {
    return {
      ...state,
      todoList: [...state.todoList.filter((t) => t.id !== todo.id), todo].sort(
        (t1, t2) => t1.id - t2.id,
      ),
    };
  }),
  on(todoStatus, (state, { id, status }) => {
    return {
      ...state,
      todoList: [
        ...state.todoList.map((t) =>
          t.id === id
            ? { ...t, errorMsg: status.errorMsg, loading: status.loading }
            : t,
        ),
      ],
    };
  }),
);
