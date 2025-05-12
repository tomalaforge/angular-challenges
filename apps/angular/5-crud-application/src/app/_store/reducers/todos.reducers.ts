import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Todo } from '../../_interfaces/todo.interface';
import {
  deleteTodoActions,
  loadTodosActions,
  updateTodoActions,
} from '../actions';

export interface TodoState extends EntityState<Todo> {
  loadingTodos: boolean;
  loadingTodoIds: number[];
  error: string | null;
}

export const todoAdapter = createEntityAdapter<Todo>();

export const initialState: TodoState = todoAdapter.getInitialState({
  loadingTodos: false,
  loadingTodoIds: [],
  error: null,
});

export const todosFeature = createFeature({
  name: 'todos',
  reducer: createReducer(
    initialState,

    // common - failure actions
    on(
      loadTodosActions.failure,
      updateTodoActions.failure,
      deleteTodoActions.failure,
      (state, { error }) => ({
        ...state,
        loadingTodos: false,
        loadingTodoIds: [],
        error: error,
      }),
    ),

    // load actions
    on(loadTodosActions.load, (state) => ({
      ...state,
      loadingTodos: true,
    })),
    on(loadTodosActions.success, (state, { todos }) =>
      todoAdapter.setAll(todos, {
        ...state,
        loadingTodos: false,
      }),
    ),

    // update actions
    on(updateTodoActions.update, (state, { update }) => ({
      ...state,
      loadingTodoIds: [...state.loadingTodoIds, update.id as number],
    })),
    on(updateTodoActions.success, (state, { update }) =>
      todoAdapter.updateOne(update, {
        ...state,
        loadingTodoIds: state.loadingTodoIds.filter((id) => id !== update.id),
      }),
    ),

    // delete actions
    on(deleteTodoActions.delete, (state, { todo }) => ({
      ...state,
      loadingTodoIds: [...state.loadingTodoIds, todo.id],
    })),
    on(deleteTodoActions.success, (state, { todo }) =>
      todoAdapter.removeOne(todo.id, {
        ...state,
        loadingTodoIds: state.loadingTodoIds.filter((id) => id !== todo.id),
      }),
    ),
  ),

  extraSelectors: ({ selectTodosState }) => ({
    ...todoAdapter.getSelectors(selectTodosState),
  }),
});
