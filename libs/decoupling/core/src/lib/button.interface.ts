export type ButtonState = 'enabled' | 'disabled';

export interface ButtonStateControl {
  state: import('@angular/core').Signal<ButtonState>;
}
