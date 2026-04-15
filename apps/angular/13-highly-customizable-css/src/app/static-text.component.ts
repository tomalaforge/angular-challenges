/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextComponent } from './text.component';

export type StaticTextType = 'normal' | 'warning' | 'error';

@Component({
  selector: 'static-text',
  imports: [TextComponent],
  template: `
    <text>This is a static text</text>
  `,
  styles: [
    `
      :host-context(.error) {
        --font: 30px;
        --color: red;
      }

      :host-context(.warning) {
        --font: 25px;
        --color: orange;
      }

      :host-context(.normal) {
        --font: 10px;
        --color: black;
      }
    `,
  ],
})
export class TextStaticComponent {}
