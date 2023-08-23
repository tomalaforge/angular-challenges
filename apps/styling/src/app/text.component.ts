/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

@Component({
  selector: 'text',
  standalone: true,
  template: `
    <p>
      <ng-content></ng-content>
    </p>
  `,
  styles: [
    `
      :host {
        color: var(--text-color, black);
        font-size: var(--text-font-size, 10px);
      }
    `,
  ],
})
export class TextComponent {}
