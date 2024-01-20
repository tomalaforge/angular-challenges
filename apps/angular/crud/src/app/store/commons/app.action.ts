import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const appActions = createActionGroup({
  source: 'App',
  events: {
    'Show Alert': props<{ message: string; resultType: string }>(),
    'Empty Action': emptyProps(),
  },
});
