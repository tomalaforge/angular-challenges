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
        loadComponent: () => import('./dashboard/dashboard.component'),
      },
      {
        path: 'create-contact',
        loadComponent: () =>
          import('./create-contact/create-contact.component').then(
            (mod) => mod.CreateContactComponent
          ),
      },
    ]),
  ],
})
export class ContactFeatureModule {}
