import { createAction, props } from '@ngrx/store';
import { Todo } from '../../model/todo.interface';

export enum TodoActionName {
  callTodoList = '[Todo] call todo list',
  loadTodoList = '[Todo] load todo list',

  callUpdateTodo = '[Todo] call update todo',
  updateTodoSuccess = '[Todo] update todo success',

  callDeleteTodo = '[Todo] call delete todo',
  deleteTodoSuccess = '[Todo] delete todo success',

  todoErrorAlert = '[Todo] todo error',
}

export const callTodoList = createAction(TodoActionName.callTodoList);
export const loadTodoList = createAction(
  TodoActionName.loadTodoList,
  props<{ todoList: Todo[] }>(),
);
export const callUpdateTodo = createAction(
  TodoActionName.callUpdateTodo,
  props<{ todo: Todo }>(),
);
export const callDeleteTodo = createAction(
  TodoActionName.callDeleteTodo,
  props<{ id: number }>(),
);

export const updateTodoSuccess = createAction(
  TodoActionName.updateTodoSuccess,
  props<{ todo: Todo }>(),
);
export const deleteTodoSuccess = createAction(
  TodoActionName.deleteTodoSuccess,
  props<{ id: number }>(),
);

export const todoErrorAlert = createAction(
  TodoActionName.todoErrorAlert,
  props<{ errorMsg: string }>(),
);
