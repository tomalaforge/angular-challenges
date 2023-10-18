import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { TIMER } from './data';

@Component({
  selector: 'timer',
  standalone: true,
  template: ` Timer running {{ timer() }} `,
})
export class TimerComponent {
  callTimer = inject(TIMER);
  timer = toSignal(interval(this.callTimer));
}
