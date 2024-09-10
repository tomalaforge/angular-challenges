import { MainShellConfig } from '@angular-challenges/module-to-standalone/shell';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, MainShellConfig).catch((err) =>
  console.error(err),
);
