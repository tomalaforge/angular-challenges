import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-contact-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    Contact Dashboard

    <button
      routerLink="create-contact"
      class="ml-10 rounded-lg border bg-gray-700 p-2 text-white">
      Create contact
    </button>
  `,
})
export default class ContactDashboardComponent {}
