import { createAction, props } from '@ngrx/store';
import { ITodo } from '../interfaces/todo.interface';

export const showGlobalLoader = createAction(
  '[Todos] Show Global Loader',
  props<{ isGlobalLoaderVisible: true }>,
);

export const hideGlobalLoader = createAction(
  '[Todos] Hide Global Loader',
  props<{ isGlobalLoaderVisible: false }>,
);

export const showLocalLoader = createAction(
  '[Todos] Show Local Loader',
  props<{ isLocalLoaderVisible: true }>,
);

export const hideLocalLoader = createAction(
  '[Todos] Hide Local Loader',
  props<{ isLocalLoaderVisible: false }>,
);

export const fetchTodos = createAction('[Todos] Fetch Todos');

export const fetchTodosSuccess = createAction(
  '[Todos] Fetch Todos Success',
  props<{ todos: ITodo[] }>(),
);

export const fetchTodosError = createAction('[Todos] Fetch Todos Error');

export const updateTodo = createAction(
  '[Todos] Update Todo',
  props<{ todo: ITodo }>(),
);

export const updateTodoSuccess = createAction(
  '[Todos] Update Todo Success',
  props<{ todo: ITodo }>(),
);

export const updateTodoError = createAction(
  '[Todos] Update Todo Error',
  props<{ message: string; id: number }>(),
);

export const deleteTodo = createAction(
  '[Todos] Delete Todo',
  props<{
    id: number;
  }>(),
);

export const deleteTodoSuccess = createAction(
  '[Todos] Delete Todo Success',
  props<{
    id: number;
  }>(),
);
export const deleteTodoError = createAction(
  '[Todos] Delete Todo Error',
  props<{ message: string }>(),
);
