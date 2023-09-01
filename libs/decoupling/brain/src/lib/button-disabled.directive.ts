/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/no-host-metadata-property */
import {
  BUTTON_STATE_TOKEN,
  ButtonState,
} from '@angular-challenges/decoupling/core';
import { Directive, WritableSignal, forwardRef, signal } from '@angular/core';

@Directive({
  selector: 'button[btnDisabled]',
  standalone: true,
  providers: [
    {
      provide: BUTTON_STATE_TOKEN,
      useExisting: forwardRef(() => BtnDisabledDirective),
    },
  ],
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
