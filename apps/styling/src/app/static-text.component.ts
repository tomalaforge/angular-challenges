/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { TextComponent } from './text.component';

export type StaticTextType = 'normal' | 'warning' | 'error';

@Component({
  selector: 'static-text',
  standalone: true,
  imports: [TextComponent],
  template: `
    <text [font]="font" [color]="color">This is a static text</text>
  `,
})
export class TextStaticComponent {
  @Input() set type(type: StaticTextType) {
    switch (type) {
      case 'error': {
        this.font = 30;
        this.color = 'red';
        break;
      }
      case 'warning': {
        this.font = 25;
        this.color = 'orange';
        break;
      }
    }
  }

  font = 10;
  color = 'black';
}
