import { Signal } from '@angular/core';

export type ButtonState = 'enabled' | 'disabled';

export type ButtonStateSignal = Signal<ButtonState>;
