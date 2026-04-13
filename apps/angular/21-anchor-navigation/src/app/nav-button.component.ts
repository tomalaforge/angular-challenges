/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'nav-button',
  imports: [RouterLinkWithHref],
  template: `
    <a [routerLink]="link()" [fragment]="fragment()">
      <ng-content />
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  href = input('');
  isAnchor = computed(() =>
    this.href().startsWith('#') ? this.href().substring(1) : '',
  );
  link = computed(() => (this.isAnchor() ? [] : this.href()));
  fragment = computed(() => (this.isAnchor() ? this.isAnchor() : undefined));
}
