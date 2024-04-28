import {
  Directive,
  HostListener,
  InjectionToken,
  computed,
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

const DEFAULT_HOLD_TIME: Ms = 1000 * 2;
export const DEFAULT_HOLD_TIME_TOKEN = new InjectionToken<number>(
  'default hold time',
);

@Directive({
  selector: '[appHoldable]',
  standalone: true,
  exportAs: 'holdable',
})
export class HoldableDirective {
  private readonly _defaultHoldTime =
    inject(DEFAULT_HOLD_TIME_TOKEN, {
      optional: true,
    }) ?? DEFAULT_HOLD_TIME;

  $period = input<Ms>(10, { alias: 'period' });
  $max = input<Ms>(this._defaultHoldTime, { alias: 'max' });

  active = output();

  private readonly _mousedownSubject = new Subject<void>();
  private readonly _mouseupSubject = new Subject<void>();

  @HostListener('mousedown') onMousedown() {
    this._mousedownSubject.next();
  }

  @HostListener('mouseup') onMouseup() {
    this._mouseupSubject.next();
  }

  time = toSignal(
    this._mousedownSubject.pipe(
      switchMap(() =>
        merge(
          interval(this.$period()).pipe(
            map((val) => val * this.$period()),
            takeWhile((time) => time < this.$max(), true),
            map((time) => {
              if (time >= this.$max()) {
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

  progress = computed(() => (this.time() / this.$max()) * 100);
}
