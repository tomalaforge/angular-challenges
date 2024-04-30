/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, WritableSignal, forwardRef, signal } from '@angular/core';

import {
  BUTTON_STATE_TOKEN,
  ButtonState,
} from '@angular-challenges/decoupling/core';

@Directive({
  selector: 'button[btnDisabledOptimized]',
  standalone: true,
  host: {
    '(click)': 'toggleState()',
  },
  providers: [
    {
      provide: BUTTON_STATE_TOKEN,
      //by using forwardRef, we provide a more secure and optimized way of resolving the ref of 'BtnDisabledOptimizedDirective'
      //in cases when BtnDisabledOptimizedDirective is not yet defined
      useExisting: forwardRef(() => BtnDisabledOptimizedDirective),
    },
  ],
})
export class BtnDisabledOptimizedDirective {
  state: WritableSignal<ButtonState> = signal('enabled');

  toggleState() {
    this.state.set(this.state() === 'enabled' ? 'disabled' : 'enabled');
  }
}
