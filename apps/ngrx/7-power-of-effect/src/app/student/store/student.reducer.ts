import { Student } from '@angular-challenges/power-of-effect/model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { studentActions } from './student.actions';

export type StudentState = EntityState<Student>;

export const studentAdapter: EntityAdapter<Student> =
  createEntityAdapter<Student>();

export const studentFeature = createFeature({
  name: 'students',
  reducer: createReducer(
    studentAdapter.getInitialState(),
    on(studentActions.addOneStudent, (state, { student }) =>
      studentAdapter.upsertOne(student, state),
    ),
    on(studentActions.addAllStudents, (state, { students }) =>
      studentAdapter.setAll(students, state),
    ),
  ),
  extraSelectors: ({ selectStudentsState }) => ({
    selectStudents: createSelector(
      selectStudentsState,
      studentAdapter.getSelectors().selectAll,
    ),
  }),
});
