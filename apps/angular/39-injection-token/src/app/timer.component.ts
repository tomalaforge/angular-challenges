import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { TIMER_VALUE } from './timer-token';

@Component({
  selector: 'timer',
  standalone: true,
  template: `
    Timer running {{ timer() }}
  `,
})
export class TimerComponent {
  private timerValue = inject(TIMER_VALUE, { optional: true }) ?? 1000;
  timer = toSignal(interval(this.timerValue));
}
