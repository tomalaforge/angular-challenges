import {
  Directive,
  DOCUMENT,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import {
  fromEvent,
  last,
  merge,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { PROGRESS_UPDATE_COUNT } from '../constants/app.constants';

@Directive({
  selector: '[holdable]',
})
export class HoldableDirective implements OnInit, OnDestroy {
  updateInterval = input.required<number>();
  numberOfUpdates = input<number>(PROGRESS_UPDATE_COUNT);

  /** emitted on each `updateInterval` */
  onInterval = output();
  /** emitted only when `pointerup`, `pointerleave` events are fired. */
  onRelease = output();
  /** emitted once the `numberOfUpdates` is reached */
  onComplete = output();

  private _destroy$ = new Subject<void>();
  private _document = inject(DOCUMENT);
  private _el: ElementRef<HTMLButtonElement> = inject(ElementRef);

  ngOnInit(): void {
    merge(
      fromEvent(this._el.nativeElement, 'pointerdown'),
      fromEvent(this._el.nativeElement, 'touchstart'),
    )
      .pipe(
        switchMap(() => {
          return this._startTimer$();
        }),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: () => {
          this.onComplete.emit();
        },
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  /**
   * Updates Progress bar every second
   *
   * Emits when the `PROGRESS_UPDATE_COUNT` is reached
   *
   * Completes when the `PROGRESS_UPDATE_COUNT` is reached or either of the `mouseup` or `mouseleave` event is fired. If event is fired before reaching the count, no emission occurs and the stream simply completes.
   */
  private _startTimer$(): Observable<number> {
    const mouseleave$ = merge(
      fromEvent(this._document, 'pointerup'),
      fromEvent(this._el.nativeElement, 'pointerleave'),
    ).pipe(tap(() => this.onRelease.emit()));

    return timer(this.updateInterval(), this.updateInterval()).pipe(
      tap(() => this.onInterval.emit()),
      take(this.numberOfUpdates()),
      last(),
      takeUntil(mouseleave$),
      // Due to `take` above, the stream is completed and takeUntil is unsubscribed
      // so `onRelease` needs to be triggered on a different `mouseleave$`
      tap(() => {
        mouseleave$.pipe(take(1)).subscribe({});
      }),
    );
  }
}
