/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextStaticComponent } from './static-text.component';
import { TextComponent } from './text.component';

@Component({
  selector: 'page',
  standalone: true,
  imports: [TextStaticComponent, TextComponent],
  styles: [
    `
      text {
        --text-font-size: 15px;
        --text-color: blue;
      }
    `,
  ],
  template: `
    <static-text></static-text>
    <static-text type="error"></static-text>
    <static-text type="warning"></static-text>
    <text>This is a blue text</text>
  `,
})
export class PageComponent {}
