import {
  bootstrapApplication,
  enableDebugTools,
} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { ApplicationRef } from '@angular/core';

bootstrapApplication(AppComponent)
  .then((module) => {
    const appRef = module.injector.get(ApplicationRef);
    const appComponent = appRef.components[0];
    enableDebugTools(appComponent);
  })
  .catch((err) => {
    console.error(err);
  });
