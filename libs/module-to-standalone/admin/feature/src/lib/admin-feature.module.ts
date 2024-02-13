import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardModule,
          ),
      },
      {
        path: 'create-user',
        loadChildren: () =>
          import('./create-user/create-user.component').then(
            (m) => m.CreateUserModule,
          ),
      },
    ]),
  ],
})
export class AdminFeatureModule {}
