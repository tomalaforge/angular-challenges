/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'button[app-button]',
  template: `
    <ng-content />
  `,
  host: {
    class: 'border border-blue-700 bg-blue-400 p-2 rounded-sm text-white',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {}
