import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-contact-dashboard',
  template: `
    Contact Dashboard

    <button
      routerLink="create-contact"
      class="ml-10 rounded-lg border bg-gray-700 p-2 text-white">
      Create contact
    </button>
  `,
  standalone: false,
})
export class ContactDashboardComponent {}

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: ContactDashboardComponent }]),
  ],
  declarations: [ContactDashboardComponent],
})
export class ContactDashboardModule {}
