import { createActionGroup, emptyProps, props } from '@ngrx/store';

// This is the global actions.
export const appActions = createActionGroup({
  source: 'App Component',
  events: {
    'Init App': emptyProps(),
  },
});

export const appApiActions = createActionGroup({
  source: 'App API',
  events: {
    Alert: props<{ message: string }>(),
  },
});
