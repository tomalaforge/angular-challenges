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
import {
  filter,
  fromEvent,
  interval,
  map,
  merge,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';

@Directive({
  standalone: true,
  selector: '[appHoldable]',
})
export class HoldableDirective {
  readonly appHoldable = input(1000, { transform: numberAttribute });
  readonly appHoldableTime = output<number>();
  readonly appHoldableDone = output<void>();
  private readonly nativeElement = inject(ElementRef).nativeElement;

  constructor() {
    const reset = merge(
      fromEvent(this.nativeElement, 'mouseup'),
      fromEvent(this.nativeElement, 'mouseleave'),
    ).pipe(tap(() => this.appHoldableTime.emit(0)));

    fromEvent(this.nativeElement, 'mousedown')
      .pipe(
        switchMap(() =>
          interval(10).pipe(
            // convert from index to 10ms increments
            map((i) => i * 10),
            tap((elapsed) => this.appHoldableTime.emit(elapsed)),
            // cancel if the user releases the mouse button or leaves the element
            takeUntil(reset),
            // accept one last value after the holdable time has passed
            filter((elapsed) => this.appHoldable() <= elapsed),
            take(1),
            // when we're done, emit the done event and reset progress
            tap(() => {
              this.appHoldableDone.emit();
              this.appHoldableTime.emit(0);
            }),
          ),
        ),
      )
      .subscribe();
  }
}
