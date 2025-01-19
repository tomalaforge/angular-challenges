import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-create-user',
  imports: [RouterLink],
  standalone: true,
  template: `
    Create User Form

    <button
      routerLink=".."
      class="ml-5 rounded-lg border bg-gray-700 p-2 text-white">
      Back
    </button>
  `,
})
export default class CreateUserComponent {}
