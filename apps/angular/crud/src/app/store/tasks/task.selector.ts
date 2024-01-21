import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskStoreModel } from './task.model';

const getTaskBaseState = createFeatureSelector<TaskStoreModel>('taskReducer');

export const getTaskListSelector = createSelector(getTaskBaseState, (state) => {
  return state.list;
});
