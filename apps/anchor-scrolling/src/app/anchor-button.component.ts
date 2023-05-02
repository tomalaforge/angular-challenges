/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
@Component({
  selector: 'anchor-button',
  standalone: true,
  imports: [RouterLinkWithHref],
  template: `
    <a [routerLink]="href">
      <ng-content></ng-content>
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class AnchorButtonComponent {
  @Input() href = '#top';
}
