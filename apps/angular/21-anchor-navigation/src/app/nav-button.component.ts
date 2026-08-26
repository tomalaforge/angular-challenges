/* eslint-disable @angular-eslint/component-selector */
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nav-button',
  template: `
    <a [routerLink]="href()" [fragment]="fragment()">
      <ng-content />
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLink],
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  public href: InputSignal<string> = input<string>('');
  public fragment: InputSignal<string> = input<string>('');
}
