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
    <text class="blue font-s-15">This a a blue text</text>
  `,
  styles: [
    `
      .blue {
        color: var(--text-blue);
      }

      .font-s-15 {
        font-size: 15px;
      }
    `,
  ],
})
export class PageComponent {}
