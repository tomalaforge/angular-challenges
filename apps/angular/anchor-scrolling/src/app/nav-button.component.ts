/* eslint-disable @angular-eslint/component-selector */
import { ViewportScroller } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'nav-button',
  standalone: true,
  template: `
    <a title="navigation button" (click)="onScrollTo()">
      <ng-content></ng-content>
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  @Input() scrollTo?: string;
  constructor(private _viewPort: ViewportScroller) {}

  public onScrollTo(): void {
    if (this.scrollTo) {
      this._viewPort.scrollToAnchor(this.scrollTo);
    }
  }
}
