import { createActionGroup, emptyProps } from '@ngrx/store';

export const appActions = createActionGroup({
  source: 'App Component',
  events: {
    'Init App': emptyProps(),
  },
});
