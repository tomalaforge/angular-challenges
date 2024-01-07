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
            (m) => m.ContactDashboardModule,
          ),
      },
      {
        path: 'create-contact',
        loadChildren: () =>
          import('./create-contact/create-contact.component').then(
            (m) => m.CreateContactModule,
          ),
      },
    ]),
  ],
})
export class ContactFeatureModule {}
