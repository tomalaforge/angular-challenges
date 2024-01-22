import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-create-contact',
  template: `
    Create Contact Form

    <button
      routerLink=".."
      class="ml-5 rounded-lg border bg-gray-700 p-2 text-white">
      Back
    </button>
  `,
  standalone: true,
  imports: [RouterLink],
})
export class CreateContactComponent {}
