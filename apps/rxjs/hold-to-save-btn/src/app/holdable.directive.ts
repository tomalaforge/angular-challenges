import {
  DestroyRef,
  Directive,
  HostListener,
  inject,
  input,
  output,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Subject,
  interval,
  map,
  merge,
  switchMap,
  takeUntil,
  takeWhile,
} from 'rxjs';

type Ms = number;

const DEFAULT_HOLD_TIME: Ms = 2000;

@Directive({
  selector: '[appHoldable]',
  standalone: true,
  exportAs: 'holdable',
})
export class HoldableDirective {
  private readonly _destroyRef = inject(DestroyRef);

  period = input<Ms>(10);
  max = input<Ms>(DEFAULT_HOLD_TIME);
  active = output();

  private readonly _mousedownSubject = new Subject<void>();
  private readonly _mouseupSubject = new Subject<void>();

  time = toSignal(
    this._mousedownSubject.pipe(
      switchMap(() =>
        merge(
          interval(this.period()).pipe(
            map((val) => val * this.period()),
            takeWhile((time) => time < this.max(), true),
            map((time) => {
              if (time >= this.max()) {
                this.active.emit();
                return 0;
              }

              return time;
            }),
            takeUntil(this._mouseupSubject),
          ),
          this._mouseupSubject.pipe(map(() => 0)),
        ),
      ),
    ),
    { initialValue: 0 },
  );

  @HostListener('mousedown') onMousedown() {
    this._mousedownSubject.next();
  }

  @HostListener('mouseup') onMouseup() {
    this._mouseupSubject.next();
  }
}
