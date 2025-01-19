import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    Dashboard

    <button
      routerLink="create-user"
      class="ml-10 rounded-lg border bg-gray-700 p-2 text-white">
      Create User
    </button>
  `,
})
export default class DashboardComponent {}
