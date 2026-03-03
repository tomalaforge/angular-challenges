/* eslint-disable @angular-eslint/component-selector */
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nav-button',
  imports: [RouterLink],
  template: `
    <a [routerLink]="routerLink()" [fragment]="fragment()">
      <ng-content />
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  routerLink = input('');
  fragment = input<string | undefined>(undefined);
}
