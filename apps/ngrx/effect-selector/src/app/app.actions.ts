import { createActionGroup, emptyProps } from '@ngrx/store';

export const AppActions = createActionGroup({
  source: 'App Component',
  events: {
    'Init App': emptyProps(),
  },
});

// not good to use createActionGroup with one action? Don't think it really matters.
