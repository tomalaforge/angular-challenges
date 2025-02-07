/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextStaticComponent } from './static-text.component';
import { TextComponent } from './text.component';

@Component({
  selector: 'page',
  standalone: true,
  imports: [TextStaticComponent, TextComponent],
  template: `
    <div class="container">
      <static-text></static-text>
      <static-text type="error"></static-text>
      <static-text type="warning"></static-text>
      <text
        style="
        --text-font-size: 15px;
        --text-color: #3498db;
        --text-font-weight: 500;
      ">
        This is a blue text
      </text>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 600px;
        margin: 32px auto;
        padding: 0 16px;
      }
    `,
  ],
})
export class PageComponent {}
