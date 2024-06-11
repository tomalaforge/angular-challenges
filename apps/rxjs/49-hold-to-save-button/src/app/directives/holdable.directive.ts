import { Directive, ElementRef, inject, input } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import {
  filter,
  fromEvent,
  interval,
  map,
  merge,
  switchMap,
  takeUntil,
} from 'rxjs';

@Directive({
  selector: '[appHoldable]',
  standalone: true,
})
export class HoldableDirective {
  appHoldable = input(1000);
  saveBtnElementRef = inject(ElementRef).nativeElement;
  //mouse out stream
  setProgressToZeroOnMouseOut$ = merge(
    fromEvent(this.saveBtnElementRef, 'mouseup'),
    fromEvent(this.saveBtnElementRef, 'mouseleave'),
  );
  mouseOut = outputFromObservable(this.setProgressToZeroOnMouseOut$);
  //button is held stream
  holdStream$ = fromEvent(this.saveBtnElementRef, 'mousedown').pipe(
    switchMap(() =>
      interval(10).pipe(
        map((elapsed) => elapsed * 10),
        takeUntil(this.setProgressToZeroOnMouseOut$),
        filter((elapsed) => elapsed <= this.appHoldable()),
      ),
    ),
  );
  progressInHold = outputFromObservable(this.holdStream$);
  //completed stream
  finishedHoldStream$ = this.holdStream$.pipe(
    filter((elapsed) => elapsed >= this.appHoldable()),
  );
  btnHoldableFinished = outputFromObservable(this.finishedHoldStream$);
}
