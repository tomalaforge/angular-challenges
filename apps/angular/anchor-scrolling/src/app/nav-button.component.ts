/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
@Component({
  selector: 'nav-button',
  imports: [RouterLinkWithHref],
  standalone: true,
  template: `
    <a [routerLink]="routerLink" [fragment]="fragment">
      <ng-content></ng-content>
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  @Input({ required: true }) routerLink!: string;
  @Input() fragment: string | undefined = undefined;
}
