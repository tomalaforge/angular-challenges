import { Student } from '@angular-challenges/power-of-effect/model';
import { createActionGroup, props } from '@ngrx/store';

export const studentActions = createActionGroup({
  source: 'Student API',
  events: {
    'Add One Student': props<{ student: Student }>(),
    'Add All Students': props<{ students: Student[] }>(),
  },
});
