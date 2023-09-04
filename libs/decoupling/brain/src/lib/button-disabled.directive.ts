/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, inject } from '@angular/core';
import { BUTTON_STATE_SIGNAL_TOKEN } from '@angular-challenges/decoupling/core';
import { ButtonStateService } from './button-state.service';

@Directive({
  selector: 'button[btnDisabled]',
  standalone: true,
  host: {
    '(click)': 'toggleState()',
  },
  providers: [
    ButtonStateService,
    {
      provide: BUTTON_STATE_SIGNAL_TOKEN,
      useFactory: () => inject(ButtonStateService).state,
    },
  ],
})
export class BtnDisabledDirective {
  state = inject(ButtonStateService).state;

  toggleState() {
    this.state.set(this.state() === 'enabled' ? 'disabled' : 'enabled');
  }
}
