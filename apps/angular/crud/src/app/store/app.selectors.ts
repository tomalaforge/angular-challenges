import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './app.reducers';

export const selectTodosStore = createFeatureSelector<TodosState>('todos');
export const selectAllTodos = createSelector(
  selectTodosStore,
  (state) => state.todos,
);
export const isError = createSelector(
  selectTodosStore,
  (state) => state.isError,
);
export const isLoading = createSelector(
  selectTodosStore,
  (state) => state.isLoading,
);
