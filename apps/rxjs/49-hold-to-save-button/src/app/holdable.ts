import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, interval, merge, takeUntil } from 'rxjs';

@Directive({
  selector: '[appHoldable]',
  standalone: true,
})
export class HoldableDirective {
  holdInterval = input<number>(500);
  startValue = input<number>(0);
  endValue = input<number>(100);

  readonly hold = output<number>();
  readonly finished = output<void>();
  readonly cancelled = output<void>();

  private readonly elRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    const el = this.elRef.nativeElement;

    const mousedown$ = fromEvent(el, 'mousedown', { passive: true });
    const touchstart$ = fromEvent(el, 'touchstart', { passive: true });
    const start$ = merge(mousedown$, touchstart$);

    const mouseup$ = fromEvent(el, 'mouseup', { passive: true });
    const mouseleave$ = fromEvent(el, 'mouseleave', { passive: true });
    const touchend$ = fromEvent(el, 'touchend', { passive: true });
    const stop$ = merge(mouseup$, mouseleave$, touchend$);

    start$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (this.startValue() >= this.endValue()) return;

      let value = this.startValue();
      let completed = false;

      const sub = interval(this.holdInterval())
        .pipe(takeUntil(stop$), takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            if (value >= this.endValue()) {
              completed = true;
              this.finished.emit();
              sub.unsubscribe();
            } else {
              value++;
              this.hold.emit(value);
            }
          },
          complete: () => {
            if (!completed) {
              this.cancelled.emit();
            }
          },
        });
    });
  }
}
