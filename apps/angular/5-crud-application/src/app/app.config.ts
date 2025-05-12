import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import {
  deleteTodoEffect,
  loadTodosEffect,
  todosFeature,
  updateTodoEffect,
} from './_store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore(),
    provideState(todosFeature),
    provideEffects([
      { effect: loadTodosEffect },
      { effect: updateTodoEffect },
      { effect: deleteTodoEffect },
    ]),
    provideHttpClient(),
  ],
};
