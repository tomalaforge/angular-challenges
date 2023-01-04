/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextComponent } from './text.component';

export type StaticTextType = 'normal' | 'warning' | 'error';

@Component({
  selector: 'static-text',
  standalone: true,
  imports: [TextComponent],
  template: ` <text>This is a static text</text> `,
  styles: [
    `
      :host {
        display: block;
        --text-font-size: 10px;
        --text-font-color: black;
      }
      :host-context(.warning) {
        display: block;
        --text-font-size: 25px;
        --text-font-color: orange;
      }
      :host-context(.error) {
        display: block;
        --text-font-size: 30px;
        --text-font-color: red;
      }
    `,
  ],
})
export class TextStaticComponent {}
