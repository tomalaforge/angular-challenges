import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideRouter, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home.component';  // Update paths as needed
import { AdminComponent } from './admin.component';
import { UserComponent } from './user.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'home', component: HomeComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'user', component: UserComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]),
  ],
}).catch((err) => console.error(err));

