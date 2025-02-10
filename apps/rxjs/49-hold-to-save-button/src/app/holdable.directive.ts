import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Subject, interval, map, takeUntil, tap } from 'rxjs';

@Directive({
  selector: '[holdable]',
  standalone: true,
})
export class HoldableDirective {
  @Input() holdDuration = 1000; // Default 1 second
  @Output() holdProgress = new EventEmitter<number>();
  @Output() holdComplete = new EventEmitter<void>();

  private holding = false;
  private cancel$ = new Subject<void>();

  @HostListener('mousedown')
  @HostListener('touchstart')
  onHoldStart() {
    this.holding = true;
    this.startHoldTimer();
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  @HostListener('touchend')
  @HostListener('touchcancel')
  onHoldEnd() {
    this.holding = false;
    this.cancel$.next();
    this.holdProgress.emit(0);
  }

  private startHoldTimer() {
    const startTime = Date.now();

    interval(10)
      .pipe(
        takeUntil(this.cancel$),
        map(() => {
          const elapsedTime = Date.now() - startTime;
          return (elapsedTime / this.holdDuration) * 100;
        }),
        tap((progress) => {
          if (progress >= 100 && this.holding) {
            this.holdComplete.emit();
            this.cancel$.next();
          }
        }),
      )
      .subscribe((progress) => {
        if (this.holding) {
          this.holdProgress.emit(Math.min(progress, 100));
        }
      });
  }
}
