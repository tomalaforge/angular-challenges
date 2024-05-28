import { Directive, ElementRef, inject, input, output } from '@angular/core';
import {
  filter,
  fromEvent,
  interval,
  map,
  merge,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

@Directive({
  selector: '[appHoldable]',
  standalone: true,
})
export class HoldableDirective {
  appHoldable = input(1000);
  btnHoldableTime = output<number>();
  btnHoldableFinished = output<void>();
  saveBtnElementRef = inject(ElementRef).nativeElement;

  constructor() {
    const setProgressToZeroOnMouseOut = merge(
      fromEvent(this.saveBtnElementRef, 'mouseup'),
      fromEvent(this.saveBtnElementRef, 'mouseleave'),
    ).pipe(
      tap(() => {
        this.btnHoldableTime.emit(0);
      }),
    );

    const destroy$ = interval(10).pipe(
      map((elapsed) => elapsed * 10),
      filter((elapsed) => elapsed > this.appHoldable()),
    );

    fromEvent(this.saveBtnElementRef, 'mousedown')
      .pipe(
        switchMap(() =>
          interval(10).pipe(
            map((elapsed) => elapsed * 10),
            tap((elapsed) => this.btnHoldableTime.emit(elapsed)),
            takeUntil(setProgressToZeroOnMouseOut),
            takeUntil(destroy$),
            tap((elapsed) => {
              if (elapsed >= this.appHoldable()) {
                this.btnHoldableFinished.emit();
                this.btnHoldableTime.emit(0);
              }
            }),
          ),
        ),
      )
      .subscribe();
  }
}
