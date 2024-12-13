import { Component } from '@angular/core';

@Component({
  selector: 'app-placeholder',
  template: `
    I'm a placeholder component.
  `,
  standalone: true,
  styles: `
    :host {
      display: grid;
      padding: 20px;
      background-color: #f0f0f0;
      height: 50%;
    }
  `,
  standalone: false,
})
export class PlaceholderComponent {}
