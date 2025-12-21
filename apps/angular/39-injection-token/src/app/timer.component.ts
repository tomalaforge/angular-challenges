import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { DEFAULT_TIMER } from './data';

@Component({
  selector: 'timer',
  template: `
    Timer running {{ timer() }}
  `,
})
export class TimerComponent {
  defaultTimer = inject(DEFAULT_TIMER);
  timer = toSignal(interval(this.defaultTimer));
}
