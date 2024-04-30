import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { TIMER_VALUE_TOKEN } from './data';

@Component({
  selector: 'timer',
  standalone: true,
  template: `
    Timer running {{ timer() }}
  `,
})
export class TimerComponent {
  private timerValue = inject(TIMER_VALUE_TOKEN);

  timer = toSignal(interval(this.timerValue));
}
