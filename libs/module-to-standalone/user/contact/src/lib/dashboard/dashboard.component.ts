import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-contact-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `Contact Dashboard

    <button
      routerLink="create-contact"
      class="border bg-gray-700 rounded-lg p-2 text-white ml-10">
      Create contact
    </button> `,
})
export default class ContactDashboardComponent {}
