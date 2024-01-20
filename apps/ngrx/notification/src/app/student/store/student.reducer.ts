import { Student } from '@angular-challenges/ngrx-notification/model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { studentActions } from './student.actions';

export const studentsFeatureKey = 'students';

export type StudentState = EntityState<Student>;

export const studentAdapter: EntityAdapter<Student> =
  createEntityAdapter<Student>();

export const studentReducer = createReducer(
  studentAdapter.getInitialState(),
  on(studentActions.addOneStudent, (state, { student }) =>
    studentAdapter.upsertOne(student, state),
  ),
  on(studentActions.addAllStudents, (state, { students }) =>
    studentAdapter.setAll(students, state),
  ),
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  studentAdapter.getSelectors();
