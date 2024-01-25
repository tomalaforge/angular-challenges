import { createFeature, createReducer, on } from '@ngrx/store';
import { taskActions } from './task.action';
import { taskBaseSate } from './task.state';

const tasksFeature = createFeature({
  name: 'tasks',
  reducer: createReducer(
    taskBaseSate,
    on(taskActions.loadTasksSuccess, (state, action) => {
      return {
        ...state,
        list: [...action.list],
        errorMessage: '',
      };
    }),
    on(taskActions.updTaskSuccess, (state, action) => {
      const _updData = state.list.map((o) => {
        return o.id === action.task.id ? action.task : o;
      });
      return {
        ...state,
        list: _updData,
        errorMessage: '',
      };
    }),
    on(taskActions.delTaskSuccess, (state, action) => {
      const _updData = state.list.filter((o) => o.id !== action.task.id);
      return {
        ...state,
        list: _updData,
        errorMessage: '',
      };
    }),
  ),
});

export const {
  name: tasksFeatureKey,
  reducer: tasksReducer,
  selectList,
} = tasksFeature;
