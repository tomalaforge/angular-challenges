import { Component } from '@angular/core';
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
  timer = toSignal(interval(DEFAULT_TIMER));
}
