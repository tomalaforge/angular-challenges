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
      :host(.error) {
        color: var(--text-error);
        font-size: 30px;
      }

      :host(.warning) {
        color: var(--text-warning);
        font-size: 25px;
      }
    `,
  ],
})
export class TextStaticComponent {}
