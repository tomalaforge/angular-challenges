/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextComponent } from './text.component';

@Component({
  selector: 'static-text',
  standalone: true,
  imports: [TextComponent],
  template: `
    <text class="text">This is a static text</text>
  `,
  styles: [
    `
      :host-context(.error) {
        --font-size: 30px;
        --color: red;
      }

      :host-context(.warning) {
        --font-size: 25px;
        --color: orange;
      }

      .text {
        font-size: var(--font-size, 10px);
        color: var(--color, black);
      }
    `,
  ],
})
export class TextStaticComponent {}
