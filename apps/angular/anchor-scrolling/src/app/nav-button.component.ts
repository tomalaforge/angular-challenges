/* eslint-disable @angular-eslint/component-selector */
import { ViewportScroller } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'nav-button',
  standalone: true,
  template: `
    <a [href]="routerLink" (click)="viewScrollSmooth('{routerLink}')">
      <ng-content></ng-content>
    </a>
  `,
  styles: `
    a{
      scroll-behavior: smooth
    }
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  @Input() routerLink = '';
  constructor(private scrollSmooth: ViewportScroller) {}
  viewScrollSmooth(element: string) {
    this.scrollSmooth.scrollToAnchor(element);
  }
}
