import { Teacher } from '@angular-challenges/power-of-effect/model';
import { createActionGroup, props } from '@ngrx/store';

export const teacherActions = createActionGroup({
  source: 'Teacher API',
  events: {
    'Add One Teacher': props<{ teacher: Teacher }>(),
    'Add All Teachers': props<{ teachers: Teacher[] }>(),
  },
});
