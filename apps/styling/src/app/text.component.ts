/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

@Component({
  selector: 'text',
  standalone: true,
  template: `
    <p style="font-size: var(--text-font-size); color: var(--text-font-color)">
      <ng-content></ng-content>
    </p>
  `,
})
export class TextComponent {}
