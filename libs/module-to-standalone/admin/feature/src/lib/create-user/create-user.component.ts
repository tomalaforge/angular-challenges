import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-create-user',
  standalone: true,
  imports: [RouterLink],
  template: `Create User Form

    <button
      routerLink=".."
      class="border bg-gray-700 rounded-lg p-2 text-white ml-5">
      Back
    </button> `,
})
export default class CreateUserComponent {}
