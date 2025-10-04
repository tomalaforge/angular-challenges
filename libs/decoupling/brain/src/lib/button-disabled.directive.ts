/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/no-host-metadata-property */
import {
  Directive,
  effect,
  output,
  signal,
  WritableSignal,
} from '@angular/core';

export type ButtonState = 'enabled' | 'disabled';

@Directive({
  selector: 'button[btnDisabled]',
  host: {
    '(click)': 'toggleState()',
  },
})
export class BtnDisabledDirective {
  readonly state: WritableSignal<ButtonState> = signal('enabled');
  readonly stateChanged = output<ButtonState>();

  constructor() {
    effect(this.onStateChange);
  }

  toggleState() {
    this.state.set(this.state() === 'enabled' ? 'disabled' : 'enabled');
  }

  private onStateChange = () => {
    const state = this.state();
    this.stateChanged.emit(state);
  };
}
