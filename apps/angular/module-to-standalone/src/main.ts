import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from '@angular-challenges/module-to-standalone/shell';
import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes), provideToken('main-shell-token')],
});
