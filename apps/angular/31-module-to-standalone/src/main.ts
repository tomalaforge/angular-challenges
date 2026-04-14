import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { appRoutes } from '@angular-challenges/module-to-standalone/shell';
import { provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(appRoutes),
    provideToken('main-shell-token'),
  ],
}).catch((err) => console.error(err));
