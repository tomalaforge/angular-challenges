import {
  bootstrapApplication,
  enableDebugTools,
} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ApplicationRef } from '@angular/core';

bootstrapApplication(AppComponent, appConfig)
  .then((module) => {
    const appRef = module.injector.get(ApplicationRef);
    const appComponent = appRef.components[0];
    enableDebugTools(appComponent);
  })
  .catch((err) => console.error);
