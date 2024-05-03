import { MainShellModule } from '@angular-challenges/module-to-standalone/shell';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserModule, MainShellModule)],
}).catch((err) => console.error(err));
