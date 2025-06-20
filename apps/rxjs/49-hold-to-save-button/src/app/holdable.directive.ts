import { Directive, ElementRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  animationFrameScheduler,
  delay,
  filter,
  fromEvent,
  interval,
  map,
  merge,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

@Directive({ selector: '[appHoldable]', standalone: true })
export class HoldableDirective {
  appHoldable = input(1000); // in ms
  appHoldableDelayAfterComplete = input(300); // in ms
  appHoldableTime = output<number>();
  appHoldableCompleted = output<void>();

  #el = inject(ElementRef);

  constructor() {
    const on$ = fromEvent(this.#el.nativeElement, 'mousedown');

    const off$ = merge(
      fromEvent(this.#el.nativeElement, 'mouseup'),
      fromEvent(this.#el.nativeElement, 'mouseleave'),
    ).pipe(tap(() => this.appHoldableTime.emit(0)));

    on$
      .pipe(
        switchMap(() =>
          interval(10, animationFrameScheduler).pipe(
            map((timeInCs) => timeInCs * 10),
            filter((timeInMs) => this.appHoldable() >= timeInMs),
            tap((progress) => this.appHoldableTime.emit(progress)),
            takeUntil(off$),
          ),
        ),
        filter((time) => time === this.appHoldable()),
        tap(() => this.appHoldableCompleted.emit()),
        delay(this.appHoldableDelayAfterComplete()),
        tap(() => this.appHoldableTime.emit(0)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
