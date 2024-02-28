/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextComponent } from './text.component';

@Component({
  selector: 'static-text',
  standalone: true,
  imports: [TextComponent],
  template: `
    <text>This is a static text</text>
  `,
  styles: `
    :host {
      --text-size: 10px;
      --text-color: black;

      &[type="error"] {
        --text-size: 30px;
        --text-color: red;
      }

      &[type="warning"] {
        --text-size: 25px;
        --text-color: orange;
      }
    }
  `,
})
export class TextStaticComponent {}
