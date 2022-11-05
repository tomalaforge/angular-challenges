import { createAction } from '@ngrx/store';

const initApp = createAction('[AppComponent] Initialisation');

export const AppActions = {
  initApp,
};
