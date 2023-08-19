import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-create-contact',
  standalone: true,
  imports: [RouterLink],
  template: `Create Contact Form

    <button
      routerLink=".."
      class="border bg-gray-700 rounded-lg p-2 text-white ml-5">
      Back
    </button> `,
})
export default class CreateContactComponent {}
