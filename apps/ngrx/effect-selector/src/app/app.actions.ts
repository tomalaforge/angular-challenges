import { createAction } from '@ngrx/store';

export const initApp = createAction('[AppComponent] initialize Application');

export const AppActions = {
  initApp,
};
