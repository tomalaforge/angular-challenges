/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nav-button',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a [routerLink]="href" [fragment]="fragment" (click)="handleClick()">
      <ng-content></ng-content>
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  @Input() href = '';
  fragment = '';

  ngOnInit() {
    const [path, fragment] = this.href.split('#');
    this.href = path || '';
    this.fragment = fragment || '';
  }

  handleClick() {
    if (this.fragment) {
      const element = document.getElementById(this.fragment);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
