/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

@Component({
  selector: 'text',
  template: `
    <p>
      <ng-content />
    </p>
  `,
  styles: [
    `
      p {
        font-size: var(--font, 10px);
        color: var(--color, black);
      }

      :host-context(.font) {
        --font: 15px;
      }

      :host-context(.color) {
        --color: blue;
      }
    `,
  ],
})
export class TextComponent {}
