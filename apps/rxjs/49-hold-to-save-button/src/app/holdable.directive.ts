// Angular team will reverse this suggestion
/* eslint-disable @angular-eslint/no-host-metadata-property */
import {
  Directive,
  ElementRef,
  inject,
  input,
  numberAttribute,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, merge } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[appHoldable]',
})
export class HoldableDirective {
  readonly appHoldable = input(1000, { transform: numberAttribute });
  readonly appHoldableTime = output<number>();
  readonly appHoldableDone = output<void>();
  private readonly nativeElement = inject(ElementRef).nativeElement;

  timer: number | null = null;

  constructor() {
    merge(
      fromEvent(this.nativeElement, 'mouseup'),
      fromEvent(this.nativeElement, 'mouseleave'),
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.resetTimer());

    fromEvent(this.nativeElement, 'mousedown')
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.startTimer());
  }

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
