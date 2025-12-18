import { provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PageComponent } from './app/page.component';

bootstrapApplication(PageComponent, {
  providers: [provideZoneChangeDetection()],
}).catch((err) => console.error(err));
