import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'lib-contact-dashboard',
  template: `
    Contact Dashboard

    <button
      routerLink="create-contact"
      class="ml-10 rounded-lg border bg-gray-700 p-2 text-white">
      Create contact
    </button>
  `,
})
export class ContactDashboardComponent {}
