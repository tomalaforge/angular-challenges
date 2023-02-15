/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'button[app-button]',
  template: `<ng-content></ng-content>`,
  host: {
    class:
      'bg-blue-400 py-1.5 px-2.5 rounded-md text-white shadow-md leading-relaxed',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {}
