/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'nav-button',
  imports: [RouterLinkWithHref],
  template: `
    <a [routerLink]="href()" [fragment]="anchor">
      <ng-content />
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  href = input('');
  @Input() anchor?: string = undefined;
}
