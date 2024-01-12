import { createActionGroup, emptyProps } from '@ngrx/store';

// This is the global actions.
export const appActions = createActionGroup({
  source: 'App Component',
  events: {
    'Init App': emptyProps(),
  },
});
