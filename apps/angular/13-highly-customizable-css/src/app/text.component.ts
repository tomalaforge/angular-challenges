/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

@Component({
  selector: 'text',
  standalone: true,
  template: `
    <p><ng-content></ng-content></p>
  `,
  styles: [
    `
      :host {
        --text-font-size: 10px;
        --text-color: black;
        --text-line-height: 1.5;
        --text-font-weight: 400;
        display: block;
        margin: 8px 0;
      }

      p {
        font-size: var(--text-font-size);
        color: var(--text-color);
        line-height: var(--text-line-height);
        font-weight: var(--text-font-weight);
        font-family: 'Segoe UI', system-ui, sans-serif;
        margin: 0;
        padding: 12px 16px;
        border-radius: 4px;
        transition: all 0.2s ease;
      }

      p:hover {
        transform: translateX(4px);
      }
    `,
  ],
})
export class TextComponent {}
