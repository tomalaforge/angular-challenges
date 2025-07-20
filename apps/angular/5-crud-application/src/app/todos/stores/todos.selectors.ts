import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IState as featureState } from './todos.reducer';

export const featureKey = 'todosCrud';

export const selectFeature = createFeatureSelector<featureState>(featureKey);

export const selectorIsGlobalLoaderVisible = createSelector(
  selectFeature,
  (state: featureState) => state.isGlobalLoaderVisible,
);

export const selectorTodos = createSelector(
  selectFeature,
  (state: featureState) => state.todos,
);

export const selectorFetchErroredGlobal = createSelector(
  selectFeature,
  (state: featureState) => state.hasErroredGlobal,
);

export const selectorFetchErroredLocal = createSelector(
  selectFeature,
  (state: featureState) => state.hasErroredLocal,
);

export const selectorFetchErroredLocalMessage = createSelector(
  selectFeature,
  (state: featureState) => state.hasErroredLocalMessage,
);
