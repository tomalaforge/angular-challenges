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

  // FIRST SOLUTION AND SECOND SOLUTION it can be removed styles array from here
  styles: [
    `
      p {
        font-size: var(--text-font-size);
        color: var(--text-color);
      }
    `,
  ],
})
export class TextComponent {}
