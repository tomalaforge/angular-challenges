import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-button',
  template: `
    <a [routerLink]="routerLink()">
      <ng-content />
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
  imports: [RouterLink],
})
export class NavButtonComponent {
  routerLink = input<string[] | string>('');
  fragment = input<string | null>(null);
}
