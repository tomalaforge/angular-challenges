/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TagScrollDirective } from './tag-scroll.directive';
@Component({
  selector: 'nav-button',
  standalone: true,
  template: `
    <a tag-scroll [routerLink]="path" [tag]="tag">
      <ng-content></ng-content>
    </a>
  `,
  imports: [RouterLink, TagScrollDirective],
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  @Input() path!: string;
  @Input() tag!: string;
}
