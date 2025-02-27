import { InjectionToken } from '@angular/core';
import { ButtonStateControl } from './button.interface';

export const BUTTON_STATE = new InjectionToken<ButtonStateControl>(
  'BUTTON_STATE',
);
