import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideRouter, withComponentInputBinding } from '@angular/router';

bootstrapApplication(AppComponent, appConfig, providers: [provideRouter(appRoutes,
  withComponentInputBinding() // 👈
)]).catch((err) =>
  console.error(err),
);
