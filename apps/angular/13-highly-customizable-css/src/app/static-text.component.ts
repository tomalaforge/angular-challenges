/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { TextComponent } from './text.component';

export type StaticTextType = 'normal' | 'warning' | 'error';

@Component({
  selector: 'static-text',
  standalone: true,
  imports: [TextComponent],
  template: `
    <text [ngClass]="typeClass">This is a static text</text>
  `,
   styles: [
    `
      .normal {
        font-size: 10px;
        color: black;
      }

      .error {
        font-size: 30px;
        color: red;
      }

      .warning {
        font-size: 25px;
        color: orange;
      }
    `,
  ],
})
export class TextStaticComponent {}
