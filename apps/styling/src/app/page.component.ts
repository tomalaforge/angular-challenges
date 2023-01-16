/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextStaticComponent } from './static-text.component';
import { TextComponent } from './text.component';

@Component({
  selector: 'page',
  standalone: true,
  imports: [TextStaticComponent, TextComponent],
  template: `
    <static-text></static-text>
    <static-text class="error"></static-text>
    <static-text class="warning"></static-text>
    <text class="text-blue text-size">This a a blue text</text>
  `,
  styles: [
    `
      .text-blue {
        color: var(--text-blue);
      }

      .text-size {
        font-size: var(--text-size);
      }
    `,
  ],
})
export class PageComponent {}
