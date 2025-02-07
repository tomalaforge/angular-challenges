/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextComponent } from './text.component';

@Component({
  selector: 'static-text',
  imports: [TextComponent],
  template: `
    <text>This is a static text</text>
  `,
  styles: [
    `
      :host {
        --text-font-size: 14px;
        --text-color: #2c3e50;
        --text-font-weight: 400;
        display: block;
      }

      :host([type='error']) {
        --text-font-size: 16px;
        --text-color: #e74c3c;
        --text-font-weight: 600;
      }

      :host([type='error']) ::ng-deep p {
        background: rgba(231, 76, 60, 0.1);
        border-left: 4px solid #e74c3c;
      }

      :host([type='warning']) {
        --text-font-size: 15px;
        --text-color: #f39c12;
        --text-font-weight: 500;
      }

      :host([type='warning']) ::ng-deep p {
        background: rgba(243, 156, 18, 0.1);
        border-left: 4px solid #f39c12;
      }
    `,
  ],
})
export class TextStaticComponent {}
