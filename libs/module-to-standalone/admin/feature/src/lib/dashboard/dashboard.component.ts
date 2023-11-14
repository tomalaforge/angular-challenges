import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'lib-dashboard',
  standalone: true,
  imports: [RouterLinkWithHref],
  template: `Dashboard
    <button
      routerLink="create-user"
      class="border bg-gray-700 rounded-lg p-2 text-white ml-10">
      Create User
    </button> `,
})
export class DashboardComponent {}
