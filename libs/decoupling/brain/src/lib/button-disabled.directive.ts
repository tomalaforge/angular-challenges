/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/no-host-metadata-property */
import {
  BUTTON_STATE,
  ButtonSignalState,
  ButtonState,
} from '@angular-challenges/decoupling/core';
import { Directive, WritableSignal, signal } from '@angular/core';

@Directive({
  selector: 'button[btnDisabled]',
  standalone: true,
  host: {
    '(click)': 'toggleState()',
  },
  providers: [
    {
      provide: BUTTON_STATE,
      useExisting: BtnDisabledDirective,
    },
  ],
})
export class BtnDisabledDirective implements ButtonSignalState {
  state: WritableSignal<ButtonState> = signal('enabled');

  toggleState() {
    this.state.update((state) =>
      state === 'enabled' ? 'disabled' : 'enabled',
    );
  }
}
