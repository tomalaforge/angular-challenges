/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

@Component({
  selector: 'text',
  standalone: true,
  template: `
    <p>
      <ng-content></ng-content>
    </p>
  `,
  styles: [
    `
      :host(.blue) {
        color: var(--text-blue);
      }

      :host(.font-s-15) {
        font-size: 15px;
      }

      :host-context(.error) {
        color: var(--text-error);
        font-size: 30px;
      }

      :host-context(.warning) {
        color: var(--text-warning);
        font-size: 25px;
      }
    `,
  ],
})
export class TextComponent {}
