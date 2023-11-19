/* eslint-disable @angular-eslint/component-selector */
import { Component, HostBinding, Input } from '@angular/core';
import { TextComponent } from './text.component';

export type StaticTextType = 'normal' | 'warning' | 'error';

@Component({
  selector: 'static-text',
  standalone: true,
  imports: [TextComponent],
  styles: [
    `
      :host {
        &.warning text {
          --text-font-size: 25px;
          --text-color: orange;
        }

        &.error text {
          --text-font-size: 30px;
          --text-color: red;
        }
      }
    `,
  ],
  template: `<text>This is a static text</text>`,
})
export class TextStaticComponent {
  @HostBinding('class')
  @Input()
  type: StaticTextType = 'normal';
}
