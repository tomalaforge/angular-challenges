import { Component, Inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { TIMER_TOKEN } from './data';
//import { DEFAULT_TIMER } from './data';

@Component({
  selector: 'timer',
  standalone: true,
  template: ` Timer running {{ timer() }} `,
})
export class TimerComponent {
  constructor(@Inject(TIMER_TOKEN) public time: number) {}
  timer = toSignal(interval(this.time));
}
