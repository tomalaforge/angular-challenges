import { Component } from '@angular/core';

@Component({
  selector: 'lib-create-contact',
  template: `Create Contact Form

    <button
      routerLink=".."
      class="border bg-gray-700 rounded-lg p-2 text-white ml-5">
      Back
    </button> `,
  standalone: true,
})
export default class CreateContactComponent {}
