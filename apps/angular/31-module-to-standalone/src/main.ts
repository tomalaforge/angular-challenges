import { importProvidersFrom } from '@angular/core';

import appRoutes from '@angular-challenges/module-to-standalone/shell';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserModule), provideRouter(appRoutes)],
}).catch((err) => console.error(err));
