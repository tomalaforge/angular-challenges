import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  TeacherState,
  teacherAdapter,
  teachersFeatureKey,
} from './teacher.reducer';

const selectTeacherState =
  createFeatureSelector<TeacherState>(teachersFeatureKey);

export const { selectAll } = teacherAdapter.getSelectors();

const selectTeachers = createSelector(selectTeacherState, selectAll);

export const TeacherSelectors = {
  selectTeachers,
};
