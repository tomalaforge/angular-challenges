import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { MainShellModule } from '@angular-challenges/module-to-standalone/shell';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(MainShellModule)],
}).catch((err) => console.log(err));
