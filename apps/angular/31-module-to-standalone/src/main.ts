import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appRoutes } from 'libs/module-to-standalone/shell/src/lib/main-shell.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserModule), provideRouter(appRoutes)],
}).catch((err) => console.error(err));
