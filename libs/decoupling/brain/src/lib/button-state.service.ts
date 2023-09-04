import { Injectable, signal } from '@angular/core';
import { ButtonState } from '@angular-challenges/decoupling/core';

@Injectable()
export class ButtonStateService {
  state = signal<ButtonState>('enabled');
}
