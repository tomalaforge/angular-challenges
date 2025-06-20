/* eslint-disable @angular-eslint/component-selector */
import { Component, input } from '@angular/core';

@Component({
  selector: 'text',
  template: `
    <p style="font-size: {{ font }}px; color: {{ color }}">
      <ng-content />
    </p>
  `,
})
export class TextComponent {
  font = input(10);
  color = input('black');
}
