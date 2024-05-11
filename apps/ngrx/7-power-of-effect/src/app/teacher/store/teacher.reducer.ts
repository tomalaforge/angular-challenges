import { Teacher } from '@angular-challenges/ngrx-notification/model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { teacherActions } from './teacher.actions';

export const teachersFeatureKey = 'teachers';

export type TeacherState = EntityState<Teacher>;

export const teacherAdapter: EntityAdapter<Teacher> =
  createEntityAdapter<Teacher>();

export const teacherReducer = createReducer(
  teacherAdapter.getInitialState(),
  on(teacherActions.addOneTeacher, (state, { teacher }) =>
    teacherAdapter.upsertOne(teacher, state),
  ),
  on(teacherActions.addAllTeachers, (state, { teachers }) =>
    teacherAdapter.setAll(teachers, state),
  ),
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  teacherAdapter.getSelectors();
