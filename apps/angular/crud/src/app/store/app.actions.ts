import { createAction, props } from '@ngrx/store';
// import { Action } from '@ngrx/store';
import { TODO } from '../app.service';

export const GETALLTODO = '[Todo] GetAllTodo';
export const UPDATETODO = '[Todo] UpdateTodo';
export const SUCCESSUPDATEDTODO = '[Todo] SuccessfullyUpdatedTodo';
export const DELETETODO = '[Todo] DeleteTodo';
export const SUCCESSDELETEDTODO = '[Todo] SuccessfullyDeletedTodo';
export const ADDEDALLTODO = '[Todo] AddedAllTodo';
export const ERRORACTION = '[Todo] Error Occured';

export const getAllTodosAction = createAction(
  GETALLTODO,
  props<{ loading: boolean }>(),
);

export const addedAllTodosAction = createAction(
  ADDEDALLTODO,
  props<{ todos: TODO[] }>(),
);

export const updateTodoAction = createAction(
  UPDATETODO,
  props<{ todo: TODO; loading: boolean }>(),
);
export const successUpdateTodoAction = createAction(
  SUCCESSUPDATEDTODO,
  props<{ todo: TODO; loading: boolean }>(),
);

export const deleteTodoAction = createAction(
  DELETETODO,
  props<{ id: number; loading: boolean }>(),
);
export const successdeleteTodoAction = createAction(
  SUCCESSDELETEDTODO,
  props<{ id: number; loading: boolean }>(),
);

export const errorAction = createAction(
  ERRORACTION,
  props<{ error: string }>(),
);

// --------another way to create actions----------

// export class GetAllTodoActions implements Action {
//   readonly type = GETALLTODO;
//   constructor(public payload: TODO) {}
// }

// export type TodoActions = GetAllTodoActions;
