/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'text',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <p style="font-size: {{ font() }}px; color: {{ color() }}">
      <ng-content />
    </p>
  `,
})
export class TextComponent {
  font = input(10);
  color = input('black');
}
