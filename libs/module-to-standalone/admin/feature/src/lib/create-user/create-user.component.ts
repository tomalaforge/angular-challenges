import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'lib-create-user',
  template: `
    Create User Form

    <button
      routerLink=".."
      class="ml-5 rounded-lg border bg-gray-700 p-2 text-white">
      Back
    </button>
  `,
})
export class CreateUserComponent {}
