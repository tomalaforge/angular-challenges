/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
@Component({
  selector: 'nav-button',
  standalone: true,
  template: `
    <a [href]="href">
      <ng-content></ng-content>
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  @Input() href = '';
}
