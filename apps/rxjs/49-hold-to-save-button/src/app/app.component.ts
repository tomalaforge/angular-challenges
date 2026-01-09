import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';
import {
  BTN_SEND_TRIGGER_INTERVAL,
  PROGRESS_INITIAL_VALUE,
  PROGRESS_MAX_VALUE,
  PROGRESS_UPDATE_COUNT,
} from '../constants/app.constants';
import { HoldableDirective } from './holdable.directive';

@Component({
  imports: [HoldableDirective],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <button
          holdable
          [updateInterval]="BTN_SEND_TRIGGER_INTERVAL"
          (onInterval)="updateProgress()"
          (onRelease)="resetProgress()"
          (onComplete)="onSend()"
          class="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors ease-in-out hover:bg-indigo-700">
          Hold me
        </button>

        <progress
          #progress
          [value]="PROGRESS_INITIAL_VALUE"
          [max]="PROGRESS_MAX_VALUE"></progress>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  progress = viewChild<string, ElementRef<HTMLProgressElement>>('progress', {
    read: ElementRef,
  });

  readonly PROGRESS_INITIAL_VALUE = PROGRESS_INITIAL_VALUE;
  readonly PROGRESS_MAX_VALUE = PROGRESS_MAX_VALUE;
  readonly BTN_SEND_TRIGGER_INTERVAL = BTN_SEND_TRIGGER_INTERVAL;

  onSend(): void {
    console.log('Save it!');
  }

  resetProgress(): void {
    this.progress().nativeElement.value = this.PROGRESS_INITIAL_VALUE;
  }

  updateProgress(): void {
    const progressEl = this.progress().nativeElement;
    const currentVal = progressEl.value;
    const increment = this.PROGRESS_MAX_VALUE / PROGRESS_UPDATE_COUNT;

    progressEl.value = currentVal + increment;
  }
}
