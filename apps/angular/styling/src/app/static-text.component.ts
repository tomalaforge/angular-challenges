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
      text {
        --text-color: black;
        --text-font-size: 10px;
      }
      :host-context(.error) {
        text {
          --text-color: red;
          --text-font-size: 30px;
        }
      }
      :host-context(.warning) {
        text {
          --text-color: orange;
          --text-font-size: 25px;
        }
      }
    `,
  ],
})
export class TextStaticComponent {
}
