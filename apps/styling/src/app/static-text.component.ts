/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextComponent } from './text.component';

@Component({
  selector: 'static-text',
  standalone: true,
  imports: [TextComponent],
  template: ` <text>This is a static text</text> `,
  styles: [
    `
      :host-context([type='error']) text {
        --text-color: red;
        --text-font-size: 30px;
      }

      :host-context([type='warning']) text {
        --text-color: orange;
        --text-font-size: 25px;
      }
    `,
  ],
})
export class TextStaticComponent {}
