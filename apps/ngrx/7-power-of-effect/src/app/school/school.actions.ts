import { School } from '@angular-challenges/power-of-effect/model';
import { createActionGroup, props } from '@ngrx/store';

export const schoolActions = createActionGroup({
  source: 'School API',
  events: {
    'Add One School': props<{ school: School }>(),
  },
});
