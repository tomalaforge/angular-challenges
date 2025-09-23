/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, input } from '@angular/core';
import { TextComponent } from './text.component';

export type StaticTextType = 'normal' | 'warning' | 'error';

@Component({
  selector: 'static-text',
  imports: [TextComponent],
  template: `
    <text [font]="font()" [color]="color()">This is a static text</text>
  `,
})
export class TextStaticComponent {
  type = input<StaticTextType>('normal');

  font = computed(() => {
    switch (this.type()) {
      case 'error':
        return 30;
      case 'warning':
        return 25;
      default:
        return 10;
    }
  });

  color = computed(() => {
    switch (this.type()) {
      case 'error':
        return 'red';
      case 'warning':
        return 'orange';
      default:
        return 'black';
    }
  });
}
