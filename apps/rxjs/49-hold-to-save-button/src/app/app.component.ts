import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  OnInit,
  inject,
  input,
  output,
} from '@angular/core';
import {
  fromEvent,
  interval,
  map,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';

@Directive({
  selector: '[appHoldable]',
  standalone: true,
})
export class HoldableDirective implements OnInit {
  timeInMilis = input.required<number>();
  protected progressUpdated = output<number>();
  protected completed = output<boolean>();

  private elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.calculateProgress();
  }

  private calculateProgress() {
    const progress$ = interval(50).pipe(
      takeUntil(
        timer(this.timeInMilis()).pipe(tap(() => this.completed.emit(true))),
      ),
      map((i) => {
        const elapsedTime = (i + 2) * 50; // Convert interval count to milliseconds
        const percentage = (elapsedTime / this.timeInMilis()) * 100; // Calculate percentage
        return Math.min(percentage, 100);
      }),
    );

    const trigger$ = fromEvent(this.elementRef.nativeElement, 'mousedown').pipe(
      switchMap(() =>
        progress$.pipe(takeUntil(fromEvent(document, 'mouseup'))),
      ),
    );
    trigger$.subscribe((progress) => this.progressUpdated.emit(progress));
  }
}

@Component({
  standalone: true,
  imports: [HoldableDirective],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <button
          appHoldable
          [timeInMilis]="timeInMilis"
          (progressUpdated)="progressUpdated($event)"
          (completed)="onSend()"
          class="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors ease-in-out hover:bg-indigo-700">
          Hold me
        </button>

        <progress [value]="progress" [max]="100"></progress>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected timeInMilis = 2000;
  progress = 0;

  onSend() {
    console.log('Save it!');
  }

  progressUpdated(progress: number) {
    this.progress = progress;
  }
}
