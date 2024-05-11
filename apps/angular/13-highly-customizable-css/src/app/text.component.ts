/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'text',
  standalone: true,
  template: `
    <p style="font-size: {{ font }}px; color: {{ color }}">
      <ng-content></ng-content>
    </p>
  `,
})
export class TextComponent {
  @Input() font = 10;
  @Input() color = 'black';
}
