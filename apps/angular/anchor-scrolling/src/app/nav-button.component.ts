/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
@Component({
  selector: 'nav-button',
  standalone: true,
  template: `
    <a [routerLink]="[routerLink]" [fragment]="fragment">
      <ng-content></ng-content>
    </a>
  `,
  imports: [RouterLinkWithHref],
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  @Input() routerLink: string = '';
  @Input() fragment?: string = undefined;
}
