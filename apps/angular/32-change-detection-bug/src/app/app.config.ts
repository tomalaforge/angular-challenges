import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BarComponent } from './bar.component';
import { FooComponent } from './foo.component';
import { MainNavigationComponent } from './main-navigation.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      {
        path: '',
        component: MainNavigationComponent,
        outlet: 'side',
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'foo',
      },
      {
        path: 'foo',
        component: FooComponent,
      },
      {
        path: 'bar',
        component: BarComponent,
      },
    ]),
  ],
};
