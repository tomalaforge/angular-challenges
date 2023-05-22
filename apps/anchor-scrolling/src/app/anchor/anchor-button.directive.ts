/* eslint-disable @angular-eslint/no-inputs-metadata-property */
/* eslint-disable @angular-eslint/component-selector */
import { Directive } from '@angular/core';
import { ScrollAnchorDirective } from './scroll-anchor.directive';

@Directive({
  selector: '[appAnchor]',
  standalone: true,
  hostDirectives: [
    { directive: ScrollAnchorDirective, inputs: ['appScrollAnchor:appAnchor'] },
  ],
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class AppAnchorDirective {}
