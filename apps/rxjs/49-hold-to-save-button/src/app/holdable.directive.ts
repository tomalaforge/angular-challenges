// Angular team will reverse this suggestion
/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, input, numberAttribute, output } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHoldable]',
  host: {
    '(mousedown)': 'startTimer()',
    '(mouseup)': 'resetTimer()',
    '(mouseleave)': 'resetTimer()',
  },
})
export class HoldableDirective {
  readonly appHoldable = input(1000, { transform: numberAttribute });
  readonly appHoldableTime = output<number>();
  readonly appHoldableDone = output<void>();

  timer: number | null = null;

  startTimer() {
    const startTime = Date.now();
    this.timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      this.appHoldableTime.emit(elapsed);
      if (elapsed >= this.appHoldable()) {
        clearInterval(this.timer ?? 0);
        this.appHoldableDone.emit();
      }
    }, 10);
  }

  resetTimer() {
    this.appHoldableTime.emit(0);
    clearInterval(this.timer ?? 0);
  }
}
