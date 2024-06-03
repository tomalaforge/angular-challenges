/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

@Component({
  selector: 'text',
  standalone: true,
  template: `
    <p class="text">
      <ng-content></ng-content>
    </p>
  `,
  styles: [
    `
      .text {
        font-size: var(--font-size, 10px);
        color: var(--color, black);
      }
    `,
  ],
})
export class TextComponent {}
