/* eslint-disable @angular-eslint/component-selector */
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nav-button',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="route()"
      [fragment]="fragment() === '' ? undefined : fragment()">
      <ng-content />
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  route = input('');
  fragment = input('');
}
