import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { DEFAULT_TIMER } from './data';

@Component({
  selector: 'timer',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    Timer running {{ timer() }}
  `,
})
export class TimerComponent {
  timer = toSignal(interval(DEFAULT_TIMER));
}
