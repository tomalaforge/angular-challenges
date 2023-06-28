import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-contact-dashboard',
  template: `Contact Dashboard

    <button
      routerLink="create-contact"
      class="border bg-gray-700 rounded-lg p-2 text-white ml-10">
      Create contact
    </button> `,
})
export class ContactDashboardComponent {}

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: ContactDashboardComponent }]),
  ],
  declarations: [ContactDashboardComponent],
})
export class ContactDashboardModule {}
