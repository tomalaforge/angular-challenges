import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { TIMER } from './data';

@Component({
  selector: 'timer',
  standalone: true,
  template: `
    Timer running {{ timerRunning() }}
  `,
})
export class TimerComponent {
  timer = inject(TIMER);
  timerRunning = toSignal(interval(inject(TIMER)));
}
