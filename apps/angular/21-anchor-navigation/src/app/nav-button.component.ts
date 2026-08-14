/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'nav-button',
  template: `
    <a [href]="href()">
      <ng-content />
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  href = input('');
}
