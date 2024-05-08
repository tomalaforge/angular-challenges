/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextStaticComponent } from './static-text.component';
import { TextComponent } from './text.component';

@Component({
  selector: 'page',
  standalone: true,
  imports: [TextStaticComponent, TextComponent],
  template: `
    <static-text />
    <static-text class="error" />
    <static-text class="warning" />
    <text>This is a blue text</text>
  `,
  styles: `
    text {
      --my-font-size: 15px;
      --my-color: blue;
    }
  `,
})
export class PageComponent {}
