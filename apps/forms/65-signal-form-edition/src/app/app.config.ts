import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HomeComponent } from './home.component';
import { UserFormComponent } from './user-form.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'add', component: UserFormComponent },
        { path: 'edit/:id', component: UserFormComponent },
        { path: '**', redirectTo: 'home' },
      ],
      withComponentInputBinding(),
    ),
  ],
};
