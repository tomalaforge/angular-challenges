/* eslint-disable @angular-eslint/no-inputs-metadata-property */
import { Directive } from '@angular/core';
import { RouterLink } from '@angular/router';

@Directive({
  selector: '[appNavButton]',
  standalone: true,
  hostDirectives: [
    { directive: RouterLink, inputs: ['routerLink:appNavButton'] },
  ],
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonDirective {}
