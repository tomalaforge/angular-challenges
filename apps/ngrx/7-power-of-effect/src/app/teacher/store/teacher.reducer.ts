import { Teacher } from '@angular-challenges/power-of-effect/model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { teacherActions } from './teacher.actions';

export type TeacherState = EntityState<Teacher>;

export const teacherAdapter: EntityAdapter<Teacher> =
  createEntityAdapter<Teacher>();

export const teacherFeature = createFeature({
  name: 'teachers',
  reducer: createReducer(
    teacherAdapter.getInitialState(),
    on(teacherActions.addOneTeacher, (state, { teacher }) =>
      teacherAdapter.upsertOne(teacher, state),
    ),
    on(teacherActions.addAllTeachers, (state, { teachers }) =>
      teacherAdapter.setAll(teachers, state),
    ),
  ),
  extraSelectors: ({ selectTeachersState }) => ({
    selectTeachers: createSelector(
      selectTeachersState,
      teacherAdapter.getSelectors().selectAll,
    ),
  }),
});
