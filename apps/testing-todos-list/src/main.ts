import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.route';

bootstrapApplication(AppComponent, {
  providers: [provideAnimations(), provideRouter(APP_ROUTES)],
}).catch((err) => console.error(err));
