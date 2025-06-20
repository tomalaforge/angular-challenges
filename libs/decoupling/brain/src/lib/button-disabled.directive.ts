/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, signal, WritableSignal } from '@angular/core';

export type ButtonState = 'enabled' | 'disabled';

@Directive({
  selector: 'button[btnDisabled]',
  host: {
    '(click)': 'toggleState()',
  },
})
export class BtnDisabledDirective {
  state: WritableSignal<ButtonState> = signal('enabled');

  toggleState() {
    this.state.set(this.state() === 'enabled' ? 'disabled' : 'enabled');
  }
}
