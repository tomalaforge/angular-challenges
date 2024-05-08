/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextComponent } from './text.component';

@Component({
  selector: 'static-text',
  standalone: true,
  imports: [TextComponent],
  template: `
    <text>This is a static text</text>
  `,
  styles: `
    :host-context(.error) text {
      --my-font-size: 30px;
      --my-color: red;
    }

    :host-context(.warning) text {
      --my-font-size: 25px;
      --my-color: orange;
    }
  `,
})
export class TextStaticComponent {}
