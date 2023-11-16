/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/no-host-metadata-property */
import {
  BUTTON_INJECTION_TOKEN,
  ButtonType,
} from '@angular-challenges/decoupling/core';
import { Directive, WritableSignal, forwardRef, signal } from '@angular/core';

@Directive({
  selector: 'button[btnDisabled]',
  standalone: true,
  host: {
    '(click)': 'toggleState()',
  },
  providers: [
    {
      provide: BUTTON_INJECTION_TOKEN,
      useExisting: forwardRef(() => BtnDisabledDirective),
    },
  ],
})
export class BtnDisabledDirective {
  state: WritableSignal<ButtonType> = signal('enabled');

  toggleState() {
    this.state.set(this.state() === 'enabled' ? 'disabled' : 'enabled');
  }
}
