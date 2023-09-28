import { Routes } from '@angular/router';
import { FooComponent } from './foo.component';
import { HomeComponent } from './home.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'foo', component: FooComponent },
  { path: '**', redirectTo: 'home' },
];