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
    <text class="text">This is a blue text</text>
  `,
  styles: [
    `
      .text {
        --font-size: 15px;
        --color: blue;
      }
    `,
  ],
})
export class PageComponent {}
