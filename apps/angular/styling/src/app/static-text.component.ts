/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextComponent } from './text.component';

export type StaticTextType = 'normal' | 'warning' | 'error';

@Component({
  selector: 'static-text',
  standalone: true,
  imports: [TextComponent],
  template: `
    <!-- <text [font]="font" [color]="color">This is a static text</text> -->
    <text>This is a static text</text>
  `,
})
export class TextStaticComponent {}
