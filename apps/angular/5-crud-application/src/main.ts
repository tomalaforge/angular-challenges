import { provideZoneChangeDetection } from '@angular/core';
import { appConfig } from './app/app.config';

import { bootstrapApplication } from '@angular/platform-browser';
import { TodoComponent } from './app/todo/todo.component';

bootstrapApplication(TodoComponent, {
  ...appConfig,
  providers: [provideZoneChangeDetection(), ...appConfig.providers],
}).catch((err) => console.error(err));
