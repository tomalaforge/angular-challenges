/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'text',
  standalone: true,
  template: `
     <p class="text-content"><ng-content></ng-content></p>
  `,
    styles: [
      `
        .text-content {
          font-size: var(--font-size, 10px);
          color: var(--color, black);
        }
      `,
    ],
})
export class TextComponent {}
