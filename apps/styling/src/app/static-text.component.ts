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
      :host text {
        color: black;
        font-size: 10px;
      }

      :host-context([type='error']) text {
        color: red;
        font-size: 30px;
      }

      :host-context([type='warning']) text {
        color: orange;
        font-size: 25px;
      }
    `,
  ],
})
export class TextStaticComponent {}
