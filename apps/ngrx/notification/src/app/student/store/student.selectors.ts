import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  StudentState,
  studentAdapter,
  studentsFeatureKey,
} from './student.reducer';

const selectStudentState =
  createFeatureSelector<StudentState>(studentsFeatureKey);

export const { selectAll } = studentAdapter.getSelectors();

const selectStudents = createSelector(selectStudentState, selectAll);

export const StudentSelectors = {
  selectStudents,
};
