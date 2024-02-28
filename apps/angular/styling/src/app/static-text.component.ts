/* eslint-disable @angular-eslint/component-selector */
import { Component, HostBinding, Input } from '@angular/core';
import { TextComponent } from './text.component';

export type StaticTextType = 'normal' | 'warning' | 'error';

@Component({
  selector: 'static-text',
  standalone: true,
  imports: [TextComponent],
  template: `
    <text>This is a static text</text>
  `,
})
export class TextStaticComponent {
  @HostBinding('class')
  @Input()
  type: StaticTextType = 'normal';
}
