/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, WritableSignal, forwardRef, signal } from '@angular/core';
import { STATE_TOKEN, State } from '@angular-challenges/decoupling/core';

@Directive({
  selector: 'button[btnDisabled]',
  standalone: true,
  providers: [
    {
      provide: STATE_TOKEN,
      useExisting: forwardRef(() => BtnDisabledDirective),
    },
  ],
  host: {
    '(click)': 'toggleState()',
  },
})
export class BtnDisabledDirective {
  state: WritableSignal<State> = signal('enabled');

  toggleState() {
    this.state.set(this.state() === 'enabled' ? 'disabled' : 'enabled');
  }
}
