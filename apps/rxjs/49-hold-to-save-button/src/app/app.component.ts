import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  filter,
  fromEvent,
  interval,
  merge,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <button
          #sendBtn
          class="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors ease-in-out hover:bg-indigo-700">
          Hold me
        </button>

        <progress [value]="progressBarValue()" [max]="100"></progress>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  sendBtn = viewChild<ElementRef<HTMLButtonElement>>('sendBtn');
  progressBarValue = signal(0);
  destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    const sendBtn = this.sendBtn();
    if (!sendBtn) {
      return;
    }

    const mouseDown$ = fromEvent(sendBtn.nativeElement, 'mousedown');
    const mouseUp$ = fromEvent(sendBtn.nativeElement, 'mouseup');
    const mouseLeave$ = fromEvent(sendBtn.nativeElement, 'mouseleave');

    mouseDown$
      .pipe(
        switchMap(() =>
          interval(10).pipe(
            takeUntilDestroyed(this.destroyRef),
            takeUntil(merge(mouseUp$, mouseLeave$)),
            takeWhile(() => this.progressBarValue() < 100),
            tap(() => this.progressBarValue.update((val) => val + 1)),
            filter(() => this.progressBarValue() === 100),
            tap(() => this.onSend()),
          ),
        ),
      )
      .subscribe();

    merge(mouseUp$, mouseLeave$)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.progressBarValue.set(0));
  }

  onSend() {
    console.log('Save it!');
  }
}
