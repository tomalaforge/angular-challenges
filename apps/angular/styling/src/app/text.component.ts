/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

@Component({
  selector: 'text',
  standalone: true,
  styles: [
    `
      p {
        font-size: var(--text-font-size, 10px);
        color: var(--text-color, black);
      }
    `,
  ],

  template: `
    <p>
      <ng-content></ng-content>
    </p>
  `,
})
export class TextComponent {}
