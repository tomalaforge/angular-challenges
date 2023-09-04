import { InjectionToken } from '@angular/core';
import { ButtonStateSignal } from './button-state-signal';

export const BUTTON_STATE_SIGNAL_TOKEN = new InjectionToken<ButtonStateSignal>(
  'Signal for ButtonState'
);
